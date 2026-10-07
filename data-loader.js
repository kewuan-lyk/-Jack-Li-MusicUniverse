/**
 * Cyberpunk Music Universe - Data Loader & Spatial Engine
 * Reliable 30s Audio Preview Data Engine
 */

class DataLoader {
  constructor() {
    this.tracks = [];
    this.stats = {};
    this.nebulae = {};

    this.genreMap = {
      'r&b': { name: 'R&B', primary: '#e056fd', secondary: '#ff7979', glow: 0xe056fd, center: { x: -164, y: 67, z: -127 } },
      'rnb': { name: 'R&B', primary: '#e056fd', secondary: '#ff7979', glow: 0xe056fd, center: { x: -164, y: 67, z: -127 } },
      'jazz': { name: 'Jazz', primary: '#ffb700', secondary: '#ff8800', glow: 0xffb700, center: { x: 57, y: -34, z: -135 } },
      'classical': { name: 'Classical', primary: '#00ffaa', secondary: '#0088ff', glow: 0x00ffaa, center: { x: 123, y: 39, z: -29 } },
      'pop': { name: 'Pop', primary: '#ff007f', secondary: '#ff4757', glow: 0xff007f, center: { x: -119, y: -39, z: 16 } },
      'synthwave': { name: 'Synthwave', primary: '#00f3ff', secondary: '#7000ff', glow: 0x00f3ff, center: { x: -26, y: 48, z: 123 } },
      'electronic': { name: 'Electronic', primary: '#00f3ff', secondary: '#7000ff', glow: 0x00f3ff, center: { x: -26, y: 48, z: 123 } },
      'rock': { name: 'Rock', primary: '#ff3b00', secondary: '#ffaa00', glow: 0xff3b00, center: { x: 119, y: -28, z: 160 } },
      'default': { name: 'Other', primary: '#9c88ff', secondary: '#48dbfb', glow: 0x9c88ff, center: { x: 4, y: -59, z: -217 } }
    };
  }

  async loadDemoData(path = './demo-tracks.json') {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const rawData = await response.json();
      return this.processData(rawData);
    } catch (err) {
      console.warn('Local fetch restricted. Using full 30-track fallback data dataset:', err);
      return this.processData(this.getFallbackDemoData());
    }
  }

  parseUserJSON(jsonInput) {
    if (!jsonInput) throw new Error('Input is empty.');
    if (typeof jsonInput === 'string') {
      try {
        const parsed = JSON.parse(jsonInput);
        return this.processData(parsed);
      } catch (err) {
        throw new Error('Invalid JSON text format. Please check your pasted data.');
      }
    } else {
      return this.processData(jsonInput);
    }
  }

  parseUserData(input, sourceName = '') {
    if (input && typeof input === 'object') return this.processData(input);
    if (typeof input !== 'string' || !input.trim()) throw new Error('Input is empty.');

    const text = input.replace(/^\uFEFF/, '').trim();
    const looksLikeJSON = /^[\[{]/.test(text);
    if (looksLikeJSON) return this.parseUserJSON(text);
    return this.parseExportifyCSV(text);
  }

  parseCSVRows(csvText) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const next = csvText[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(field);
        field = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && next === '\n') i++;
        row.push(field);
        if (row.some(value => value.trim() !== '')) rows.push(row);
        row = [];
        field = '';
      } else {
        field += char;
      }
    }

    if (inQuotes) throw new Error('CSV contains an unclosed quoted field.');
    row.push(field);
    if (row.some(value => value.trim() !== '')) rows.push(row);
    return rows;
  }

  parseExportifyCSV(csvText) {
    const rows = this.parseCSVRows(csvText.replace(/^\uFEFF/, ''));
    if (rows.length < 2) throw new Error('CSV must contain a header row and at least one track.');

    const normalizeHeader = value => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const headers = rows[0].map(normalizeHeader);
    const headerSet = new Set(headers);
    const hasTrackName = ['trackname', 'name', 'title'].some(key => headerSet.has(key));
    const hasArtist = ['artistnames', 'artistname', 'artist'].some(key => headerSet.has(key));
    if (!hasTrackName || !hasArtist) {
      throw new Error('CSV is missing the Exportify Track Name or Artist Name(s) column.');
    }

    const getValue = (values, aliases) => {
      for (const alias of aliases) {
        const index = headers.indexOf(normalizeHeader(alias));
        if (index >= 0 && values[index] !== undefined) return String(values[index]).trim();
      }
      return '';
    };

    const tracks = rows.slice(1).map((values, index) => {
      const uri = getValue(values, ['Track URI', 'Spotify URI', 'URI']);
      const spotifyUrl = getValue(values, ['Track URL', 'Spotify URL', 'URL']);
      const spotifyId = (uri.match(/spotify:track:([A-Za-z0-9]{22})/) ||
        spotifyUrl.match(/open\.spotify\.com\/track\/([A-Za-z0-9]{22})/) || [])[1] || '';
      const energyRaw = parseFloat(getValue(values, ['Energy']));
      const energy = Number.isFinite(energyRaw)
        ? (energyRaw <= 1 ? energyRaw * 100 : energyRaw)
        : 50;
      const releaseDate = getValue(values, ['Album Release Date', 'Release Date']);

      return {
        id: spotifyId || `csv_track_${index + 1}`,
        type: spotifyId ? 'track' : undefined,
        uri,
        spotifyUrl,
        songName: getValue(values, ['Track Name', 'Name', 'Title']),
        artist: getValue(values, ['Artist Name(s)', 'Artist Name', 'Artist']),
        album: getValue(values, ['Album Name', 'Album']) || 'Single',
        // Exportify usually does not include artist genres. Leave it empty so
        // cleanTrackItem can infer a useful galaxy from the artist/title.
        genre: getValue(values, ['Artist Genres', 'Genres', 'Album Genres']),
        releaseYear: parseInt(releaseDate.slice(0, 4), 10) || 2020,
        duration_ms: parseInt(getValue(values, ['Track Duration (ms)', 'Duration (ms)', 'Duration_ms']), 10) || 0,
        popularity: parseInt(getValue(values, ['Popularity']), 10) || 0,
        energy,
        preview_url: getValue(values, ['Track Preview URL', 'Preview URL']),
        lastPlayed: getValue(values, ['Added At']) || 'Recent',
        tagline: 'Imported from an Exportify playlist CSV.'
      };
    }).filter(track => track.songName || track.uri);

    if (tracks.length === 0) throw new Error('No valid tracks were found in this CSV.');
    return this.processData(tracks);
  }

  cleanTrackItem(item, idx) {
    if (!item || typeof item !== 'object') return null;

    const id = String(item.id || `track_${idx + 1}`);
    const songName = String(item.songName || item.name || item.title || `Track #${idx + 1}`).trim();
    const artist = String(item.artist || (item.artists ? item.artists.map(a => a.name).join(', ') : 'Unknown Artist')).trim();

    const rawGenre = this.inferGenre(item, songName, artist);

    let matchKey = 'default';
    for (const key in this.genreMap) {
      if (rawGenre.includes(key)) {
        matchKey = key;
        break;
      }
    }
    const genreConfig = this.genreMap[matchKey];
    const genre = genreConfig.name;

    let playCount = parseInt(item.playCount || item.plays || item.popularity || 0, 10);
    if (isNaN(playCount) || playCount < 0) playCount = 0;

    let energy = parseFloat(item.energy !== undefined ? item.energy : 50);
    if (isNaN(energy)) energy = 50;
    energy = Math.max(0, Math.min(100, energy));

    let releaseYear = parseInt(item.releaseYear || item.year || (item.album && typeof item.album === 'object' ? parseInt(item.album.release_date) : 2020) || 2020, 10);
    if (isNaN(releaseYear)) releaseYear = 2020;
    releaseYear = Math.max(1900, Math.min(2026, releaseYear));

    const tagline = String(item.tagline || item.comment || `${playCount} streams recorded.`).trim();
    const album = item.album ? String(item.album.name || item.album) : 'Single';
    const duration = parseInt(item.duration || (item.duration_ms ? Math.round(item.duration_ms / 1000) : 210), 10) || 210;
    const lastPlayed = String(item.lastPlayed || '2026-09-28');
    const mood = String(item.mood || (energy > 75 ? 'Energetic' : energy > 45 ? 'Balanced' : 'Chill'));
    const language = String(item.language || 'English');

    const spotifySourceUrl = item.spotifyUrl || item.external_urls?.spotify || '';
    const spotifyUriId = typeof item.uri === 'string' && item.uri.startsWith('spotify:track:')
      ? item.uri.split(':').pop()
      : '';
    const spotifyUrlId = typeof spotifySourceUrl === 'string'
      ? (spotifySourceUrl.match(/open\.spotify\.com\/track\/([A-Za-z0-9]{22})/) || [])[1]
      : '';
    const nativeSpotifyId = item.type === 'track' && /^[A-Za-z0-9]{22}$/.test(String(item.id || ''))
      ? String(item.id)
      : '';
    const spotifyId = String(item.spotifyId || item.spotify_id || spotifyUriId || spotifyUrlId || nativeSpotifyId || '').trim();
    const spotifyUri = spotifyId ? `spotify:track:${spotifyId}` : '';
    const spotifyUrl = spotifySourceUrl || (spotifyId
      ? `https://open.spotify.com/track/${spotifyId}`
      : `https://open.spotify.com/search/${encodeURIComponent(songName + ' ' + artist)}`);
    const previewUrl = item.previewUrl || item.preview_url || item.preview || '';

    return {
      id,
      songName,
      artist,
      genre,
      genreConfig,
      playCount,
      energy,
      releaseYear,
      tagline,
      album,
      duration,
      lastPlayed,
      mood,
      language,
      spotifyId,
      spotifyUri,
      spotifyUrl,
      previewUrl
    };
  }

  inferGenre(item, songName, artist) {
    const artistGenres = Array.isArray(item.artists)
      ? item.artists.flatMap(entry => Array.isArray(entry.genres) ? entry.genres : [])
      : [];
    const explicit = item.genre || item.artistGenres || item.artist_genres ||
      (Array.isArray(item.genres) ? item.genres.join(' ') : item.genres) || artistGenres.join(' ');
    const source = `${explicit} ${artist} ${songName} ${item.album?.name || item.album || ''}`.toLowerCase();
    const rules = [
      { genre: 'classical', words: ['classical', 'orchestra', 'orchestral', 'baroque', 'opera', 'symphony', 'piano concerto', 'mozart', 'beethoven'] },
      { genre: 'jazz', words: ['jazz', 'bebop', 'swing', 'blues', 'soul jazz', 'bossa', 'ellington', 'coltrane', 'miles davis', 'nina simone', 'ella fitzgerald', 'frank sinatra'] },
      { genre: 'rock', words: ['rock', 'alternative', 'indie rock', 'punk', 'metal', 'grunge', 'hard rock', 'post-rock', 'emo', 'shoegaze', 'nirvana', 'foo fighters', 'radiohead', 'queen', 'beatles', 'arctic monkeys', 'black sabbath', 'led zeppelin', 'eagles', 'guns n roses', 'metallica', 'linkin park', 'oasis'] },
      { genre: 'electronic', words: ['electronic', 'edm', 'house', 'techno', 'trance', 'dubstep', 'drum and bass', 'dance', 'electro', 'ambient', 'downtempo', 'daft punk', 'deadmau5', 'avicii', 'kavinsky'] },
      { genre: 'r&b', words: ['r&b', 'rnb', 'neo soul', 'neo-soul', 'funk', 'motown', 'soul', 'hip hop', 'hip-hop', 'hiphop', 'rap', 'trap', 'afrobeats', 'the weeknd', 'sza', 'usher', 'beyonce', 'childish gambino'] },
      { genre: 'pop', words: ['pop', 'k-pop', 'j-pop', 'indie pop', 'dream pop', 'taylor swift', 'lady gaga', 'michael jackson', 'madonna', 'billie eilish'] }
    ];
    const match = rules.find(rule => rule.words.some(word => source.includes(word)));
    return (match ? match.genre : 'pop').trim().toLowerCase();
  }

  processData(rawData) {
    let list = [];
    if (Array.isArray(rawData)) {
      list = rawData;
    } else if (rawData && rawData.tracks && Array.isArray(rawData.tracks)) {
      list = rawData.tracks;
    } else if (rawData && rawData.items && Array.isArray(rawData.items)) {
      // Spotify's current playlist response uses `item`; older exports use `track`.
      list = rawData.items.map(entry => entry.item || entry.track || entry);
    } else if (rawData && typeof rawData === 'object') {
      list = [rawData];
    }

    const cleaned = [];
    list.forEach((item, idx) => {
      const track = this.cleanTrackItem(item, idx);
      if (track) cleaned.push(track);
    });

    if (cleaned.length === 0) {
      cleaned.push(this.cleanTrackItem({ songName: 'Demo Track', artist: 'Synth Artist', playCount: 150, energy: 75, releaseYear: 2020 }, 0));
    }

    let maxPlayCount = 1;
    let minYear = 2026;
    let maxYear = 1900;

    cleaned.forEach(t => {
      if (t.playCount > maxPlayCount) maxPlayCount = t.playCount;
      if (t.releaseYear < minYear) minYear = t.releaseYear;
      if (t.releaseYear > maxYear) maxYear = t.releaseYear;
    });

    if (minYear === maxYear) {
      minYear -= 5;
      maxYear += 5;
    }

    const nebulaeClusters = {};
    const genreBuckets = {};
    cleaned.forEach(track => {
      if (!genreBuckets[track.genre]) genreBuckets[track.genre] = [];
      genreBuckets[track.genre].push(track);
    });
    let totalPlays = 0;
    let totalEnergy = 0;
    const genreStats = {};

    // Normalize years inside each genre so every track stays within its own nebula.
    const genreYearRanges = {};
    cleaned.forEach(track => {
      if (!genreYearRanges[track.genre]) {
        genreYearRanges[track.genre] = { min: track.releaseYear, max: track.releaseYear };
      } else {
        genreYearRanges[track.genre].min = Math.min(genreYearRanges[track.genre].min, track.releaseYear);
        genreYearRanges[track.genre].max = Math.max(genreYearRanges[track.genre].max, track.releaseYear);
      }
    });

    this.tracks = cleaned.map(track => {
      totalPlays += track.playCount;
      totalEnergy += track.energy;
      genreStats[track.genre] = (genreStats[track.genre] || 0) + 1;

      const playScore = Math.log(track.playCount + 1) / Math.log(maxPlayCount + 1);
      const energyScore = track.energy / 100;

      const genreYears = genreYearRanges[track.genre];
      const genreYearSpan = genreYears.max - genreYears.min;
      const yearNorm = genreYearSpan === 0
        ? 0.5
        : (track.releaseYear - genreYears.min) / genreYearSpan;
      const galaxyCenter = track.genreConfig.center || { x: 0, y: 0, z: 0 };
      const bucket = genreBuckets[track.genre];
      const localIndex = bucket.indexOf(track);
      const crowdScale = Math.min(3.8, 0.85 + Math.sqrt(bucket.length / 4));
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const angle = localIndex * goldenAngle + yearNorm * Math.PI * 1.7;
      const radialNorm = Math.sqrt((localIndex + 0.7) / Math.max(1, bucket.length));
      const spread = Math.min(128, 30 + crowdScale * 16 + Math.sqrt(bucket.length) * 3.4);
      const radius = 8 + radialNorm * spread;
      const yearOffset = (yearNorm - 0.5) * Math.min(42, 18 + crowdScale * 7);
      const posX = galaxyCenter.x + Math.cos(angle) * radius + yearOffset;
      const posY = galaxyCenter.y + (0.5 * energyScore + 0.5 * playScore - 0.65) * (28 + crowdScale * 7);
      const posZ = galaxyCenter.z + Math.sin(angle) * radius;

      const hash = this.stringHash(track.id + track.songName);
      const microX = ((hash % 100) / 100 - 0.5) * 5;
      const microY = (((hash >> 2) % 100) / 100 - 0.5) * 5;
      const microZ = (((hash >> 4) % 100) / 100 - 0.5) * 7;

      const position = {
        x: posX + microX,
        y: posY + microY,
        z: posZ + microZ
      };

      const planetSize = Math.max(1.0, Math.min(1.8, 1.0 + playScore * 0.8));
      const emissiveIntensity = 0.6 + energyScore * 0.6;
      const pulsateSpeed = 0.6 + (energyScore * 0.7 + playScore * 0.7);

      const gName = track.genre;
      if (!nebulaeClusters[gName]) {
        nebulaeClusters[gName] = {
          genre: gName,
          palette: track.genreConfig,
          spatialAnchor: { ...track.genreConfig.center },
          positions: [],
          count: 0,
          radius: 0
        };
      }
      nebulaeClusters[gName].positions.push(position);
      nebulaeClusters[gName].count++;
      nebulaeClusters[gName].radius = Math.max(nebulaeClusters[gName].radius,
        Math.hypot(position.x - galaxyCenter.x, position.y - galaxyCenter.y, position.z - galaxyCenter.z));

      return {
        ...track,
        palette: track.genreConfig,
        position,
        playScore,
        energyScore,
        size: planetSize,
        emissiveIntensity,
        pulsateSpeed
      };
    });

    for (const gName in nebulaeClusters) {
      const cluster = nebulaeClusters[gName];
      // Keep the authored galaxy anchor stable. Averaging a large playlist's
      // positions would pull the whole nebula away from its navigation point.
      cluster.center = { ...cluster.spatialAnchor };
    }
    this.nebulae = nebulaeClusters;

    this.stats = {
      totalTracks: this.tracks.length,
      totalPlays,
      avgEnergy: Math.round(totalEnergy / (this.tracks.length || 1)),
      topGenre: Object.keys(genreStats).reduce((a, b) => genreStats[a] > genreStats[b] ? a : b, 'R&B'),
      genreDistribution: genreStats,
      minYear,
      maxYear
    };

    return {
      tracks: this.tracks,
      stats: this.stats,
      nebulae: this.nebulae
    };
  }

  stringHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  getFallbackDemoData() {
    return [
      { id: "t01", songName: "Starboy", artist: "The Weeknd ft. Daft Punk", genre: "R&B", playCount: 342, energy: 88, releaseYear: 2016, tagline: "Late night spiritual R&B pillar under the neon glow.", album: "Starboy", duration: 230, lastPlayed: "2026-09-28", mood: "energetic", language: "English", spotifyId: "7MXVkk9YMctZqd1Srtv4MB" },
      { id: "t02", songName: "Redbone", artist: "Childish Gambino", genre: "R&B", playCount: 265, energy: 72, releaseYear: 2016, tagline: "Groovy funk-infused R&B for late night relaxation.", album: "Awaken, My Love!", duration: 326, lastPlayed: "2026-09-25", mood: "groovy", language: "English", spotifyId: "0wXuerDYiBnERgIpbb3JBR" },
      { id: "t03", songName: "Snooze", artist: "SZA", genre: "R&B", playCount: 310, energy: 58, releaseYear: 2022, tagline: "Soulful R&B rhythm, top played autumn track.", album: "SOS", duration: 201, lastPlayed: "2026-10-01", mood: "mellow", language: "English", spotifyId: "4iZ4pt7kvcaH6Yo8UoZ4s2" },
      { id: "t04", songName: "Earned It", artist: "The Weeknd", genre: "R&B", playCount: 195, energy: 65, releaseYear: 2015, tagline: "Smooth cinematic R&B vocals during evening downtime.", album: "Beauty Behind the Madness", duration: 277, lastPlayed: "2026-08-30", mood: "sensual", language: "English", spotifyId: "7ID2dydg1QFuWObmdhwzfm" },
      { id: "t05", songName: "Best Part", artist: "Daniel Caesar ft. H.E.R.", genre: "R&B", playCount: 245, energy: 45, releaseYear: 2017, tagline: "Acoustic R&B harmony for quiet morning coffee.", album: "Freudian", duration: 219, lastPlayed: "2026-09-26", mood: "warm", language: "English", spotifyId: "4OBZT9EnhYIV17t4pGw7ig" },

      { id: "t06", songName: "Fly Me to the Moon", artist: "Frank Sinatra", genre: "Jazz", playCount: 145, energy: 35, releaseYear: 1964, tagline: "Timeless retro jazz, exclusive rainy day soundtrack.", album: "It Might as Well Be Swing", duration: 147, lastPlayed: "2026-09-29", mood: "vintage", language: "English", spotifyId: "7FXj7Qg3YorUxdrzvrcY25" },
      { id: "t07", songName: "Take Five", artist: "The Dave Brubeck Quartet", genre: "Jazz", playCount: 110, energy: 48, releaseYear: 1959, tagline: "Classic 5/4 swing rhythm while reading.", album: "Time Out", duration: 324, lastPlayed: "2026-09-10", mood: "sophisticated", language: "Instrumental", spotifyId: "1YQWosTIljIvxAgHWTp7KP" },
      { id: "t08", songName: "What a Wonderful World", artist: "Louis Armstrong", genre: "Jazz", playCount: 95, energy: 25, releaseYear: 1967, tagline: "Warm and healing raspy vocals that bring calm.", album: "What a Wonderful World", duration: 139, lastPlayed: "2026-08-20", mood: "peaceful", language: "English", spotifyId: "29U7stRjqHU6rMiS8BfaI9" },
      { id: "t09", songName: "My Favorite Things", artist: "John Coltrane", genre: "Jazz", playCount: 130, energy: 52, releaseYear: 1961, tagline: "Virtuoso saxophone improvisations.", album: "My Favorite Things", duration: 822, lastPlayed: "2026-09-05", mood: "creative", language: "Instrumental", spotifyId: "3ZikLQCnH3SIswlGENBcKe" },
      { id: "t10", songName: "Feeling Good", artist: "Nina Simone", genre: "Jazz", playCount: 175, energy: 70, releaseYear: 1965, tagline: "Powerful soulful brass and vocal strength.", album: "I Put a Spell on You", duration: 173, lastPlayed: "2026-09-27", mood: "empowering", language: "English", spotifyId: "6Rqn2GFlmvmV4w9Ala0I1e" },

      { id: "t11", songName: "Levitating", artist: "Dua Lipa", genre: "Pop", playCount: 240, energy: 88, releaseYear: 2020, tagline: "Upbeat disco pop rhythm for workouts.", album: "Future Nostalgia", duration: 203, lastPlayed: "2026-10-03", mood: "upbeat", language: "English", spotifyId: "39LLxExYz6ewLAcYrzQQyP" },
      { id: "t12", songName: "Shape of You", artist: "Ed Sheeran", genre: "Pop", playCount: 210, energy: 78, releaseYear: 2017, tagline: "Catchy pop beats, high frequency commute companion.", album: "Divide", duration: 233, lastPlayed: "2026-09-24", mood: "lively", language: "English", spotifyId: "7qiZfU4dY1lWllzX7mPBI3" },
      { id: "t13", songName: "As It Was", artist: "Harry Styles", genre: "Pop", playCount: 285, energy: 82, releaseYear: 2022, tagline: "Bouncy synth-pop melodies that dominated summer.", album: "Harry's House", duration: 167, lastPlayed: "2026-10-01", mood: "joyful", language: "English", spotifyId: "4Dvkj6JhhA12EX05fT7y2e" },
      { id: "t14", songName: "Cruel Summer", artist: "Taylor Swift", genre: "Pop", playCount: 230, energy: 85, releaseYear: 2019, tagline: "High-octane pop bridge for road trips.", album: "Lover", duration: 178, lastPlayed: "2026-09-28", mood: "vibrant", language: "English", spotifyId: "1BxfuPKGuaTgP7aM0Bbdwr" },
      { id: "t15", songName: "Bad Guy", artist: "Billie Eilish", genre: "Pop", playCount: 260, energy: 75, releaseYear: 2019, tagline: "Minimalist heavy bass pop rhythm.", album: "When We All Fall Asleep", duration: 194, lastPlayed: "2026-09-19", mood: "quirky", language: "English", spotifyId: "2Fxmhks0bxGSBdJ92vM42m" },

      { id: "t16", songName: "Blinding Lights", artist: "The Weeknd", genre: "Synthwave", playCount: 410, energy: 92, releaseYear: 2020, tagline: "Annual stream champion! High speed drive synth.", album: "After Hours", duration: 200, lastPlayed: "2026-10-02", mood: "hypnotic", language: "English", spotifyId: "0VjIjW4GlUZAMYd2vXMi3b" },
      { id: "t17", songName: "Midnight City", artist: "M83", genre: "Synthwave", playCount: 215, energy: 90, releaseYear: 2011, tagline: "High frequency playback at 1:30 AM on highway.", album: "Hurry Up, We're Dreaming", duration: 243, lastPlayed: "2026-09-15", mood: "euphoric", language: "English", spotifyId: "1eyzqe2QqGZUmfcPZtrIyt" },
      { id: "t18", songName: "Resonance", artist: "HOME", genre: "Synthwave", playCount: 310, energy: 68, releaseYear: 2014, tagline: "Nostalgic synth vibes for late night project focus.", album: "Odyssey", duration: 212, lastPlayed: "2026-09-20", mood: "chill", language: "Instrumental", spotifyId: "1TuopWDIuDi1553081zvuU" },
      { id: "t19", songName: "Nightcall", artist: "Kavinsky", genre: "Synthwave", playCount: 290, energy: 75, releaseYear: 2010, tagline: "Iconic synthwave track, perfect background audio.", album: "OutRun", duration: 259, lastPlayed: "2026-09-18", mood: "focused", language: "English", spotifyId: "0U0ldCRmgCqhVvD6ksG63j" },
      { id: "t20", songName: "V", artist: "Marcin Przybyłowicz", genre: "Synthwave", playCount: 260, energy: 94, releaseYear: 2020, tagline: "The main Cyberpunk 2077 score theme.", album: "Cyberpunk 2077 - Original Score", duration: 154, lastPlayed: "2026-09-30", mood: "futuristic", language: "Instrumental", spotifyId: "2u1FWVxAb16qbgwPgygAdj" },

      { id: "t21", songName: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", playCount: 280, energy: 96, releaseYear: 1975, tagline: "Immortal rock operatic masterpiece.", album: "A Night at the Opera", duration: 354, lastPlayed: "2026-09-27", mood: "epic", language: "English", spotifyId: "7tFiyTwD0nx5a1eklYtX2J" },
      { id: "t22", songName: "Hotel California", artist: "Eagles", genre: "Rock", playCount: 175, energy: 72, releaseYear: 1976, tagline: "Legendary dual-guitar solo morning ritual.", album: "Hotel California", duration: 391, lastPlayed: "2026-09-14", mood: "classic", language: "English", spotifyId: "40riOy7x9W7GXjyGp4pjAv" },
      { id: "t23", songName: "Smells Like Teen Spirit", artist: "Nirvana", genre: "Rock", playCount: 195, energy: 98, releaseYear: 1991, tagline: "Explosive grunge energy that pumps your heart.", album: "Nevermind", duration: 301, lastPlayed: "2026-09-22", mood: "intense", language: "English", spotifyId: "5ghIJDpPoe3CfHMGu71E6T" },
      { id: "t24", songName: "Stairway to Heaven", artist: "Led Zeppelin", genre: "Rock", playCount: 160, energy: 78, releaseYear: 1971, tagline: "Epic progression from acoustic to electric solo.", album: "Led Zeppelin IV", duration: 482, lastPlayed: "2026-09-11", mood: "mystical", language: "English", spotifyId: "5CQ30WqJwcep0pYcV4AMNc" },
      { id: "t25", songName: "Sweet Child O Mine", artist: "Guns N Roses", genre: "Rock", playCount: 225, energy: 90, releaseYear: 1987, tagline: "Melodic guitar intro and soaring vocals.", album: "Appetite for Destruction", duration: 356, lastPlayed: "2026-09-26", mood: "triumphant", language: "English", spotifyId: "7snQQk1zcKl8gZ92AnueZW" },

      { id: "t26", songName: "Clair de Lune, L. 32", artist: "Claude Debussy, Martin Jones", genre: "Classical", playCount: 120, energy: 18, releaseYear: 1905, tagline: "Serene impressionist piano piece for deep work.", album: "Debussy: Clair De Lune and Other Piano Favourites", duration: 268, lastPlayed: "2026-09-30", mood: "serene", language: "Instrumental", spotifyId: "5u5aVJKjSMJr4zesMPz7bL" },
      { id: "t27", songName: "Time", artist: "Hans Zimmer", genre: "Classical", playCount: 155, energy: 60, releaseYear: 2010, tagline: "Cinematic orchestral build-up for clarity.", album: "Inception OST", duration: 275, lastPlayed: "2026-09-26", mood: "cinematic", language: "Instrumental", spotifyId: "6ZFbXIJkuI1dVNWvzJzown" },
      { id: "t28", songName: "Experience", artist: "Ludovico Einaudi", genre: "Classical", playCount: 170, energy: 55, releaseYear: 2013, tagline: "Hypnotic contemporary piano strings.", album: "In a Time Lapse", duration: 315, lastPlayed: "2026-09-27", mood: "inspiring", language: "Instrumental", spotifyId: "7sXDYdXmR2PnafjkpfdCYv" },
      { id: "t29", songName: "Gymnopedie No 1", artist: "Erik Satie", genre: "Classical", playCount: 105, energy: 12, releaseYear: 1888, tagline: "Minimalist ambient piano for peaceful night sleep.", album: "Gymnopdies", duration: 188, lastPlayed: "2026-09-15", mood: "quiet", language: "Instrumental", spotifyId: "5NGtFXVpXSvwunEIGeviY3" },
      { id: "t30", songName: "The Four Seasons: Winter - I. Allegro non molto", artist: "Antonio Vivaldi, Janine Jansen", genre: "Classical", playCount: 115, energy: 78, releaseYear: 1725, tagline: "Virtuoso Baroque violin speed and drama.", album: "Vivaldi: The Four Seasons", duration: 180, lastPlayed: "2026-09-08", mood: "dramatic", language: "Instrumental", spotifyId: "0AMX4PZEVffwEnSvwWm7mC" }
    ];
  }
}

if (typeof window !== 'undefined') {
  window.DataLoader = DataLoader;
}
