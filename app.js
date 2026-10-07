/**
 * Cyberpunk Music Universe - Main Engine
 * Guaranteed Audio Preview Engine with Web Audio Synthesizer Fallback
 * Optional community chat proxy configuration (define before app.js loads):
 * window.MUSIC_UNIVERSE_CHAT_API = { endpoint: '/api/chat', model: 'your-model' };
 * The proxy should accept { model, persona, messages } and return { reply }.
 */

const I18N = {
  en: {
    appTitle: "Cyberpunk Music Universe",
    btnGuide: "User Guide",
    btnUpload: "Import Playlist",
    btnUniverses: "Universes",
    btnCommunity: "Community",
    btnReset: "Reset View",
    btnAudioOn: "SFX Sound: ON",
    btnAudioOff: "SFX Sound: OFF",
    statTracks: "Total Stars:",
    statPlays: "Total Plays:",
    statGenre: "Dominant Genre:",
    hintInteraction: "🖱 Left-drag: move · Right-drag: rotate · Scroll: zoom · Click a star: details",
    labelTelemetry: "Listening Memory & Story:",
    labelPlayCount: "Play Count",
    labelEnergy: "Energy Level",
    labelReleaseYear: "Release Era",
    labelAlbum: "Album",
    labelDuration: "Track Duration",
    labelLastPlayed: "Last Played",
    btnPlayPreview: "▶️ Play 30s Audio Preview",
    btnPausePreview: "⏸️ Pause Preview",
    btnHidePreview: "⏹ Hide Preview Player",
    spotifyUnavailable: "This track has no Spotify track ID. Use Open on Spotify to search for it.",
    spotifyLoading: "Loading Spotify player…",
    guideSpotifyImportTitle: "🎵 5. Import a Spotify Playlist",
    guideExportifyTitle: "Fastest: Exportify CSV",
    guideExportify1: "Open Exportify, sign in to Spotify, and click Export beside the playlist you want.",
    guideExportify2: "Upload the downloaded .csv file directly. Keep the first-row column names unchanged.",
    guideExportify3: "Track URI, Track Name, and Artist Name(s) are recognized automatically; optional genre and audio-feature columns improve the visualization.",
    guideJsonTitle: "Advanced: Spotify API JSON",
    guideSpotifyImport1: "In Spotify, open a playlist you own or collaborate on, choose Share → Copy link, then copy the ID after /playlist/ and before ?.",
    guideSpotifyImport2: "Open Spotify's Get Playlist Items API page, authorize, enter the playlist ID, set limit to 50 and offset to 0, then run the request.",
    guideSpotifyImport3: "Paste the complete JSON response into Import Playlist, or save it as a .json file and upload it there.",
    guideSpotifyImport4: "For more than 50 items, repeat with offsets 50, 100, etc., and combine all entries into one items array.",
    guideSpotifyImportNote: "CSV and JSON stay in your browser. Local files, podcast episodes, and market-restricted tracks may not have a playable Spotify link.",
    guideStep2: "Left-drag to move through space. Right-drag to rotate the view. Scroll to zoom. Click a star to focus and open its details.",
    guideStep4: "Open Import Playlist, choose an Exportify CSV or Spotify JSON file, then generate your custom starfield.",
    navTitle: "Galaxy Directory",
    navMoveHint: "Left-drag to move · Right-drag to rotate",
    navHide: "Hide galaxy directory",
    navShow: "Show galaxy directory",
    navFocused: "Navigating to {genre} Galaxy",
    btnSpotify: "🎧 Open on Spotify",
    guideTitle: "📖 User Guide & Instructions",
    btnGotIt: "Got It / Start Exploring",
    modalTitle: "Generate Your Music Universe",
    modalDesc: "Upload an Exportify CSV or Spotify JSON file, or paste either format below.",
    importDestinationLabel: "IMPORT DESTINATION",
    importMergeTitle: "Add to current universe",
    importMergeHint: "Keep existing stars and add new tracks without duplicates.",
    importNewTitle: "Create a new universe",
    importNewHint: "Save this playlist separately; older universes remain available.",
    importMergeAction: "Add to current universe",
    importNewAction: "Create universe",
    universeNameLabel: "Universe name",
    universeNamePlaceholder: "e.g. Late Night Orbit",
    archiveTitle: "Saved Universes",
    archiveDesc: "Switch between locally saved music universes. Your playlists stay in this browser.",
    archiveActive: "CURRENT",
    archiveTracks: "{count} tracks",
    archiveOpen: "Open universe",
    btnDone: "Done",
    importFormats: "SUPPORTED FORMATS",
    importDropTitle: "Drop a playlist file here",
    importDropHint: "Exportify .csv or Spotify .json · UTF-8 · one playlist at a time",
    importNoFile: "No file selected",
    importPasteLabel: "Or paste CSV / JSON",
    importPlaceholder: "Paste Exportify CSV or Spotify JSON here…",
    btnLoadSample: "JSON Sample",
    btnLoadCsvSample: "CSV Sample",
    btnChooseFile: "Choose CSV / JSON",
    btnCancel: "Cancel",
    btnRender: "Generate My Music Universe",
    toastInit: "Music Universe Initialized successfully.",
    toastRendered: "Universe re-rendered with {count} celestial pixel stars across 3D nebulae!",
    toastError: "Could not read playlist data: ",
    toastNeedData: "Please paste or choose a CSV / JSON file first.",
    toastFileLoaded: "Loaded {name} as {format}",
    toastMerged: "Added {added} new tracks. This universe now has {count} stars.",
    toastCreated: "Created {name} with {count} stars.",
    toastSwitched: "Opened {name}.",
    toastReset: "Camera reset to full galaxy overview.",
    communityEyebrow: "LIVE MUSIC NEIGHBORHOOD",
    communityTitle: "Visit Community Universes",
    communityDesc: "Explore another listener's universe and chat with its resident music fan.",
    communityApiNote: "Chat supports a configurable API and automatically falls back to an on-device persona.",
    communityVisit: "Visit universe",
    communityChat: "Chat",
    communityLive: "ONLINE",
    communityTracks: "{count} stars · {genre} lover",
    communityChatPlaceholder: "Talk about music…",
    communityVisiting: "Visiting",
    communityReturn: "Return home",
    communityApiReady: "GROQ AI",
    communityLocalMode: "LOCAL",
    communityThinking: "tuning the signal…",
    communityQuickRecommend: "Recommend one track",
    communityQuickMood: "What fits tonight?",
    communityQuickFavorite: "Your favorite artist?",
    communityGuestImport: "Return to your own universe before importing a playlist.",
    communityVisitToast: "Now visiting {name}.",
    communityReturnToast: "Returned to {name}."
  },
  es: {
    appTitle: "Universo Musical Cyberpunk",
    btnGuide: "Manual",
    btnUpload: "Importar Playlist",
    btnUniverses: "Universos",
    btnCommunity: "Comunidad",
    btnReset: "Restablecer Vista",
    btnAudioOn: "Efectos SFX: SI",
    btnAudioOff: "Efectos SFX: NO",
    statTracks: "Estrellas Totales:",
    statPlays: "Reproducciones:",
    statGenre: "Género Principal:",
    hintInteraction: "🖱 Arrastrar izq.: mover · Arrastrar der.: rotar · Rueda: zoom",
    labelTelemetry: "Memoria e Historia de Reproducción:",
    labelPlayCount: "Reproducciones",
    labelEnergy: "Nivel de Energía",
    labelReleaseYear: "Época de Lanzamiento",
    labelAlbum: "Álbum",
    labelDuration: "Duración",
    labelLastPlayed: "Última Escucha",
    btnPlayPreview: "▶️ Reproducir Vista Previa (30s)",
    btnPausePreview: "⏸️ Pausar Vista Previa",
    btnHidePreview: "⏹ Ocultar reproductor",
    spotifyUnavailable: "Esta canción no tiene un ID de Spotify. Usa el enlace para buscarla.",
    spotifyLoading: "Cargando el reproductor de Spotify…",
    guideSpotifyImportTitle: "🎵 5. Importar una playlist de Spotify",
    guideExportifyTitle: "Más rápido: CSV de Exportify",
    guideExportify1: "Abre Exportify, inicia sesión con Spotify y pulsa Export junto a la playlist.",
    guideExportify2: "Sube directamente el archivo .csv descargado. No cambies los nombres de las columnas de la primera fila.",
    guideExportify3: "Track URI, Track Name y Artist Name(s) se reconocen automáticamente; los géneros y atributos de audio opcionales mejoran la visualización.",
    guideJsonTitle: "Avanzado: JSON de Spotify API",
    guideSpotifyImport1: "En Spotify, abre una playlist propia o compartida, selecciona Compartir → Copiar enlace y copia el ID situado entre /playlist/ y ?.",
    guideSpotifyImport2: "Abre la página Get Playlist Items de Spotify, autoriza el acceso, introduce el ID, usa limit 50 y offset 0, y ejecuta la solicitud.",
    guideSpotifyImport3: "Pega la respuesta JSON completa en Importar Playlist, o guárdala como archivo .json y súbela allí.",
    guideSpotifyImport4: "Si hay más de 50 elementos, repite con offset 50, 100, etc. y combina todas las entradas en un único array items.",
    guideSpotifyImportNote: "Los CSV y JSON se procesan en tu navegador. Los archivos locales, podcasts y canciones restringidas pueden no tener un enlace reproducible.",
    guideStep2: "Arrastra con el botón izquierdo para moverte. Usa el derecho para rotar, la rueda para acercar y haz clic en una estrella para abrir sus detalles.",
    guideStep4: "Abre Importar Playlist, elige un CSV de Exportify o JSON de Spotify y genera tu campo de estrellas.",
    navTitle: "Directorio galáctico",
    navMoveHint: "Izquierdo: mover · Derecho: rotar",
    navHide: "Ocultar directorio",
    navShow: "Mostrar directorio",
    navFocused: "Navegando a la galaxia {genre}",
    btnSpotify: "🎧 Escuchar en Spotify",
    guideTitle: "📖 Manual de Usuario",
    btnGotIt: "Entendido / Explorar",
    modalTitle: "Genera tu Universo Musical",
    modalDesc: "Sube un CSV de Exportify o un JSON de Spotify, o pega cualquiera de los dos formatos abajo.",
    importDestinationLabel: "DESTINO DE IMPORTACIÓN",
    importMergeTitle: "Añadir al universo actual",
    importMergeHint: "Conserva las estrellas existentes y añade canciones sin duplicados.",
    importNewTitle: "Crear un universo nuevo",
    importNewHint: "Guarda esta playlist por separado; los universos anteriores seguirán disponibles.",
    importMergeAction: "Añadir al universo actual",
    importNewAction: "Crear universo",
    universeNameLabel: "Nombre del universo",
    universeNamePlaceholder: "p. ej. Órbita nocturna",
    archiveTitle: "Universos guardados",
    archiveDesc: "Cambia entre universos guardados localmente. Tus playlists permanecen en este navegador.",
    archiveActive: "ACTUAL",
    archiveTracks: "{count} canciones",
    archiveOpen: "Abrir universo",
    btnDone: "Listo",
    importFormats: "FORMATOS COMPATIBLES",
    importDropTitle: "Suelta aquí un archivo de playlist",
    importDropHint: "Exportify .csv o Spotify .json · UTF-8 · una playlist cada vez",
    importNoFile: "Ningún archivo seleccionado",
    importPasteLabel: "O pega CSV / JSON",
    importPlaceholder: "Pega aquí un CSV de Exportify o JSON de Spotify…",
    btnLoadSample: "Ejemplo JSON",
    btnLoadCsvSample: "Ejemplo CSV",
    btnChooseFile: "Elegir CSV / JSON",
    btnCancel: "Cancelar",
    btnRender: "Generar Mi Universo Musical",
    toastInit: "Universo Musical Inicializado con éxito.",
    toastRendered: "¡Galaxia regenerada con {count} estrellas píxel en nebulosas 3D!",
    toastError: "No se pudieron leer los datos: ",
    toastNeedData: "Primero pega o elige un archivo CSV / JSON.",
    toastFileLoaded: "{name} cargado como {format}",
    toastMerged: "Se añadieron {added} canciones nuevas. Este universo tiene ahora {count} estrellas.",
    toastCreated: "Se creó {name} con {count} estrellas.",
    toastSwitched: "Se abrió {name}.",
    toastReset: "Cámara restablecida a la vista general.",
    communityEyebrow: "VECINDARIO MUSICAL EN VIVO",
    communityTitle: "Visitar universos de la comunidad",
    communityDesc: "Explora el universo de otra persona y conversa con su fan musical residente.",
    communityApiNote: "El chat admite una API configurable y usa una personalidad local como respaldo.",
    communityVisit: "Visitar universo",
    communityChat: "Chatear",
    communityLive: "EN LÍNEA",
    communityTracks: "{count} estrellas · fan de {genre}",
    communityChatPlaceholder: "Habla de música…",
    communityVisiting: "Visitando",
    communityReturn: "Volver a casa",
    communityApiReady: "GROQ AI",
    communityLocalMode: "LOCAL",
    communityThinking: "ajustando la señal…",
    communityQuickRecommend: "Recomienda una canción",
    communityQuickMood: "¿Qué va bien esta noche?",
    communityQuickFavorite: "¿Tu artista favorito?",
    communityGuestImport: "Vuelve a tu universo antes de importar una playlist.",
    communityVisitToast: "Ahora visitas {name}.",
    communityReturnToast: "Has vuelto a {name}."
  },
  zh: {
    appTitle: "赛博朋克音乐星空",
    btnGuide: "使用说明",
    btnUpload: "导入歌单",
    btnUniverses: "宇宙存档",
    btnCommunity: "音乐社区",
    btnReset: "重置视角",
    btnAudioOn: "音效: 开启",
    btnAudioOff: "音效: 关闭",
    statTracks: "星体总数:",
    statPlays: "累计播放:",
    statGenre: "主导曲风:",
    hintInteraction: "🖱 左键拖动：移动 · 右键拖动：旋转 · 滚轮：缩放 · 点击星体：详情",
    labelTelemetry: "听歌记忆与故事:",
    labelPlayCount: "播放次数",
    labelEnergy: "能量值",
    labelReleaseYear: "发行年份",
    labelAlbum: "所属专辑",
    labelDuration: "歌曲时长",
    labelLastPlayed: "最后播放日期",
    btnPlayPreview: "▶️ 播放 30秒 试听",
    btnPausePreview: "⏸️ 暂停试听",
    btnHidePreview: "⏹ 收起试听播放器",
    spotifyUnavailable: "这首歌没有 Spotify 曲目 ID，请使用下方按钮前往 Spotify 搜索。",
    spotifyLoading: "正在加载 Spotify 播放器…",
    guideSpotifyImportTitle: "🎵 5. 导入 Spotify 歌单",
    guideExportifyTitle: "最快方式：Exportify CSV",
    guideExportify1: "打开 Exportify，登录 Spotify，然后点击目标歌单旁的 Export。",
    guideExportify2: "直接上传下载得到的 .csv 文件，请保留首行字段名不变。",
    guideExportify3: "系统会自动识别 Track URI、Track Name 和 Artist Name(s)；若包含曲风和音频特征列，星系效果会更丰富。",
    guideJsonTitle: "进阶方式：Spotify API JSON",
    guideSpotifyImport1: "在 Spotify 打开你拥有或参与协作的歌单，选择“分享 → 复制歌单链接”；歌单 ID 位于 /playlist/ 之后、? 之前。",
    guideSpotifyImport2: "打开 Spotify 官方 Get Playlist Items 页面，完成授权，填入歌单 ID，将 limit 设为 50、offset 设为 0，然后运行请求。",
    guideSpotifyImport3: "复制完整 JSON 响应并粘贴到“导入歌单”，也可以保存为 .json 文件后上传。",
    guideSpotifyImport4: "超过 50 首时，继续使用 offset 50、100 等分批请求，再把所有记录合并到同一个 items 数组。",
    guideSpotifyImportNote: "CSV 与 JSON 只在浏览器内处理。本地文件、播客节目和地区受限曲目可能没有可播放的 Spotify 链接。",
    guideStep2: "按住鼠标左键拖动可在星空中平移；按住右键拖动可旋转视角；滚轮缩放；单击星体可聚焦并打开详情。",
    guideStep4: "打开“导入歌单”，选择 Exportify CSV 或 Spotify JSON 文件，然后生成你的专属星空。",
    navTitle: "星系目录",
    navMoveHint: "左键移动 · 右键旋转",
    navHide: "隐藏星系目录",
    navShow: "打开星系目录",
    navFocused: "正在前往 {genre} 星系",
    btnSpotify: "🎧 在 Spotify 中打开",
    guideTitle: "📖 使用流程与指南说明",
    btnGotIt: "我知道了，开始探索",
    modalTitle: "生成我的音乐星空",
    modalDesc: "上传 Exportify CSV 或 Spotify JSON 文件，也可以直接在下方粘贴任一格式。",
    importDestinationLabel: "导入位置",
    importMergeTitle: "添加到当前宇宙",
    importMergeHint: "保留现有星球，只添加不重复的新歌曲。",
    importNewTitle: "创建新的宇宙",
    importNewHint: "将此歌单单独保存，旧宇宙仍可随时访问。",
    importMergeAction: "添加到当前宇宙",
    importNewAction: "创建宇宙",
    universeNameLabel: "宇宙名称",
    universeNamePlaceholder: "例如：深夜轨道",
    archiveTitle: "宇宙存档",
    archiveDesc: "切换保存在本机浏览器中的音乐宇宙，歌单数据不会上传。",
    archiveActive: "当前",
    archiveTracks: "{count} 首歌曲",
    archiveOpen: "打开宇宙",
    btnDone: "完成",
    importFormats: "支持格式",
    importDropTitle: "拖放歌单文件到这里",
    importDropHint: "Exportify .csv 或 Spotify .json · UTF-8 · 每次一个歌单",
    importNoFile: "尚未选择文件",
    importPasteLabel: "或粘贴 CSV / JSON",
    importPlaceholder: "在此粘贴 Exportify CSV 或 Spotify JSON…",
    btnLoadSample: "JSON 示例",
    btnLoadCsvSample: "CSV 示例",
    btnChooseFile: "选择 CSV / JSON",
    btnCancel: "取消",
    btnRender: "生成我的音乐星空",
    toastInit: "音乐星空已成功初始化。",
    toastRendered: "星空已重构！包含 {count} 个音乐像素星体分布于多大独立星系！",
    toastError: "无法读取歌单数据：",
    toastNeedData: "请先粘贴或选择 CSV / JSON 文件。",
    toastFileLoaded: "已载入 {name}（{format}）",
    toastMerged: "已添加 {added} 首新歌，当前宇宙共有 {count} 颗星球。",
    toastCreated: "已创建 {name}，包含 {count} 颗星球。",
    toastSwitched: "已打开 {name}。",
    toastReset: "视角已重置至全景星系视角。",
    communityEyebrow: "实时音乐社区",
    communityTitle: "访问别人的音乐宇宙",
    communityDesc: "探索其他听众的宇宙，并和拥有对应音乐品味的居民聊天。",
    communityApiNote: "聊天支持接入可配置 API；未配置或连接失败时会自动使用本地风格人格。",
    communityVisit: "访问宇宙",
    communityChat: "开始聊天",
    communityLive: "在线",
    communityTracks: "{count} 颗星 · 喜欢 {genre}",
    communityChatPlaceholder: "聊聊音乐……",
    communityVisiting: "正在访问",
    communityReturn: "返回我的宇宙",
    communityApiReady: "GROQ AI",
    communityLocalMode: "本地",
    communityThinking: "正在调频……",
    communityQuickRecommend: "推荐一首歌",
    communityQuickMood: "今晚适合听什么？",
    communityQuickFavorite: "你最喜欢谁？",
    communityGuestImport: "请先返回自己的宇宙，再导入歌单。",
    communityVisitToast: "正在访问 {name}。",
    communityReturnToast: "已返回 {name}。"
  }
};

class MusicUniverseApp {
  constructor() {
    this.currentLang = 'en';
    this.audioEnabled = true;
    this.dataLoader = new DataLoader();

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.starGroup = new THREE.Group();
    this.nebulaGroup = new THREE.Group();
    this.deepSpaceGroup = new THREE.Group();
    this.universeLinkGroup = new THREE.Group();
    this.starMeshes = [];
    this.labelElements = [];
    this.nebulaMarkers = [];

    this.selectedPulseMesh = null;
    this.selectedStar = null;

    this.cameraTargetPos = null;
    this.controlsTargetPos = null;
    this.isCameraAnimating = false;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredStar = null;
    this.pointerStart = null;
    this.wasPointerDragging = false;

    // Audio Elements
    this.audioCtx = null;
    this.previewAudio = new Audio();
    this.isPreviewPlaying = false;
    this.synthInterval = null;

    // Spotify's official iFrame API controller (no client secret is exposed).
    this.spotifyIframeApi = window.spotifyIframeApi || null;
    this.spotifyEmbedController = null;
    this.spotifyControllerCreating = false;
    this.selectedImportFileName = '';
    this.storageKey = 'music-universe-archives-v2';
    this.universeStore = { version: 1, activeId: null, universes: [] };
    this.currentUniverseId = null;
    this.currentUniverseName = 'Demo Universe';
    this.currentTracks = [];
    this.importMode = 'merge';
    this.communityProfiles = this.createCommunityProfiles();
    this.communityChatHistory = {};
    this.communityApiFailures = new Set();
    this.activeCommunityChatId = null;
    this.currentCommunityId = null;
    this.homeUniverseId = null;

    this.init();
  }

  createCommunityProfiles() {
    const track = (id, songName, artist, genre, spotifyId, releaseYear, energy, playCount, album, mood, tagline) => ({
      id: `community_${id}`,
      songName,
      artist,
      genre,
      spotifyId,
      releaseYear,
      energy,
      playCount,
      album,
      mood,
      tagline,
      duration: 220,
      lastPlayed: 'Community favorite'
    });

    return [
      {
        id: 'rock',
        owner: 'Rex Voltage',
        universeName: 'Rex’s Amp Nebula',
        genre: 'Rock',
        accent: '#ff5b3a',
        avatar: '⚡',
        description: {
          en: 'Big riffs, live-room energy, and zero patience for quiet guitar solos.',
          es: 'Grandes riffs, energía de directo y cero paciencia para solos tímidos.',
          zh: '偏爱巨大吉他 riff、现场能量，以及绝不收敛的独奏。'
        },
        systemPrompt: 'You are Rex Voltage, a warm but rebellious rock fan. Speak with punchy confidence, use occasional guitar and live-show metaphors, and recommend rock music with specific reasons. Never pretend to be a real human. Keep replies under 120 words.',
        tracks: [
          track('r1', 'Bohemian Rhapsody', 'Queen', 'Rock', '7tFiyTwD0nx5a1eklYtX2J', 1975, 96, 428, 'A Night at the Opera', 'epic', 'Opera, riffs, and a stadium-sized emotional arc.'),
          track('r2', 'Hotel California', 'Eagles', 'Rock', '40riOy7x9W7GXjyGp4pjAv', 1976, 72, 314, 'Hotel California', 'classic', 'A slow-burn road trip with an immortal guitar finale.'),
          track('r3', 'Smells Like Teen Spirit', 'Nirvana', 'Rock', '5ghIJDpPoe3CfHMGu71E6T', 1991, 98, 391, 'Nevermind', 'intense', 'Grunge ignition for nights that need a hard reset.'),
          track('r4', 'Stairway to Heaven', 'Led Zeppelin', 'Rock', '5CQ30WqJwcep0pYcV4AMNc', 1971, 78, 278, 'Led Zeppelin IV', 'mystical', 'The patient climb from acoustic mist to electric fire.'),
          track('r5', 'Sweet Child O Mine', 'Guns N Roses', 'Rock', '7snQQk1zcKl8gZ92AnueZW', 1987, 90, 346, 'Appetite for Destruction', 'triumphant', 'That opening guitar line still lights up the whole room.')
        ]
      },
      {
        id: 'rnb',
        owner: 'Maya Moon',
        universeName: 'Maya’s Velvet Orbit',
        genre: 'R&B',
        accent: '#d86cff',
        avatar: '☾',
        description: {
          en: 'Velvet vocals, midnight basslines, and songs that understand complicated feelings.',
          es: 'Voces de terciopelo, bajos nocturnos y canciones que entienden emociones complejas.',
          zh: '丝绒般的人声、午夜低音，以及懂得复杂情绪的旋律。'
        },
        systemPrompt: 'You are Maya Moon, a thoughtful R&B fan with a smooth, intimate voice. Respond warmly, notice emotional nuance, use subtle late-night imagery, and recommend R&B songs based on mood. Never pretend to be a real human. Keep replies under 120 words.',
        tracks: [
          track('b1', 'Starboy', 'The Weeknd ft. Daft Punk', 'R&B', '7MXVkk9YMctZqd1Srtv4MB', 2016, 88, 418, 'Starboy', 'energetic', 'Neon confidence drifting through the midnight city.'),
          track('b2', 'Redbone', 'Childish Gambino', 'R&B', '0wXuerDYiBnERgIpbb3JBR', 2016, 72, 365, 'Awaken, My Love!', 'groovy', 'Warm analog haze with a heartbeat underneath.'),
          track('b3', 'Snooze', 'SZA', 'R&B', '4iZ4pt7kvcaH6Yo8UoZ4s2', 2022, 58, 452, 'SOS', 'mellow', 'Soft devotion for the hour when the room finally gets quiet.'),
          track('b4', 'Earned It', 'The Weeknd', 'R&B', '7ID2dydg1QFuWObmdhwzfm', 2015, 65, 287, 'Beauty Behind the Madness', 'sensual', 'Cinematic strings wrapped around a slow pulse.'),
          track('b5', 'Best Part', 'Daniel Caesar ft. H.E.R.', 'R&B', '4OBZT9EnhYIV17t4pGw7ig', 2017, 45, 338, 'Freudian', 'warm', 'A quiet duet that feels like morning light through curtains.')
        ]
      },
      {
        id: 'pop',
        owner: 'Lumi Sparks',
        universeName: 'Lumi’s Hook Supernova',
        genre: 'Pop',
        accent: '#ff4f9a',
        avatar: '✦',
        description: {
          en: 'Sharp hooks, bright synths, dramatic bridges, and a playlist for every main-character moment.',
          es: 'Estribillos brillantes, sintetizadores y una playlist para cada momento protagonista.',
          zh: '抓耳副歌、明亮合成器，以及属于每个主角时刻的歌单。'
        },
        systemPrompt: 'You are Lumi Sparks, an upbeat pop fan. Be bright, playful, concise, and enthusiastic about hooks, production, bridges, and sing-along moments. Recommend pop tracks with an energetic reason. Never pretend to be a real human. Keep replies under 120 words.',
        tracks: [
          track('p1', 'Levitating', 'Dua Lipa', 'Pop', '39LLxExYz6ewLAcYrzQQyP', 2020, 88, 432, 'Future Nostalgia', 'upbeat', 'Disco-pop propulsion with a chorus built for motion.'),
          track('p2', 'Shape of You', 'Ed Sheeran', 'Pop', '7qiZfU4dY1lWllzX7mPBI3', 2017, 78, 319, 'Divide', 'lively', 'A minimal rhythmic hook that refuses to leave.'),
          track('p3', 'As It Was', 'Harry Styles', 'Pop', '4Dvkj6JhhA12EX05fT7y2e', 2022, 82, 446, 'Harry’s House', 'joyful', 'Bittersweet lyrics racing over weightless synth-pop.'),
          track('p4', 'Cruel Summer', 'Taylor Swift', 'Pop', '1BxfuPKGuaTgP7aM0Bbdwr', 2019, 85, 501, 'Lover', 'vibrant', 'The bridge arrives like a meteor shower everyone can sing.'),
          track('p5', 'Bad Guy', 'Billie Eilish', 'Pop', '2Fxmhks0bxGSBdJ92vM42m', 2019, 75, 382, 'When We All Fall Asleep', 'quirky', 'Minimal bass, whispered attitude, maximum character.')
        ]
      }
    ];
  }

  async init() {
    this.initThree();
    this.initLights();
    this.initGridAxis();
    this.initDeepSpaceBackdrop();
    this.setupEventListeners();
    this.initAudioContext();

    try {
      const restored = this.loadUniverseStore();
      if (restored) {
        this.activateUniverse(this.universeStore.activeId, false);
      } else {
        const data = await this.dataLoader.loadDemoData('./demo-tracks.json');
        this.createStarterUniverse(data);
      }
    } catch (err) {
      console.error('Failed to load demo data:', err);
    }

    this.setLanguage('en');
    this.animate();
  }

  initThree() {
    const container = document.getElementById('canvas-container');

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030511, 0.0016);

    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 4000);
    this.camera.position.set(230, 125, 430);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    // Keep zoom inside a cinematic range: close enough for planet details,
    // but never so close or distant that the universe loses its composition.
    this.controls.maxDistance = 650;
    this.controls.minDistance = 40;
    this.controls.enablePan = true;
    this.controls.screenSpacePanning = true;
    this.controls.panSpeed = 1.25;
    this.controls.rotateSpeed = 0.65;
    this.controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
    this.controls.mouseButtons.MIDDLE = THREE.MOUSE.DOLLY;
    this.controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
    this.controls.touches.ONE = THREE.TOUCH.PAN;
    this.controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    this.controls.addEventListener('start', () => {
      // Manual navigation should immediately take priority over camera fly-to animations.
      this.isCameraAnimating = false;
    });

    this.scene.add(this.deepSpaceGroup);
    this.scene.add(this.universeLinkGroup);
    this.scene.add(this.nebulaGroup);
    this.scene.add(this.starGroup);

    const shockGeo = new THREE.RingGeometry(1, 1.3, 32);
    const shockMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    this.selectedPulseMesh = new THREE.Mesh(shockGeo, shockMat);
    this.selectedPulseMesh.rotation.x = Math.PI / 2;
    this.scene.add(this.selectedPulseMesh);
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.58);
    this.scene.add(ambient);

    const cyanLight = new THREE.PointLight(0x00f3ff, 1.8, 560);
    cyanLight.position.set(150, 100, 150);
    this.scene.add(cyanLight);

    const pinkLight = new THREE.PointLight(0xff007f, 1.65, 560);
    pinkLight.position.set(-150, -50, -150);
    this.scene.add(pinkLight);
  }

  initGridAxis() {
    const gridHelper = new THREE.GridHelper(520, 52, 0x00f3ff, 0x1a2b4c);
    gridHelper.position.y = -60;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.16;
    gridHelper.material.depthWrite = false;
    this.scene.add(gridHelper);
  }

  initDeepSpaceBackdrop() {
    const starCount = 3200;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const cool = new THREE.Color('#6488b8');
    const violet = new THREE.Color('#7b5c9f');

    for (let i = 0; i < starCount; i++) {
      const radius = 300 + Math.pow(Math.random(), 0.65) * 1100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.78;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const color = cool.clone().lerp(violet, Math.random());
      const brightness = 0.38 + Math.random() * 0.28;
      colors[i * 3] = color.r * brightness;
      colors[i * 3 + 1] = color.g * brightness;
      colors[i * 3 + 2] = color.b * brightness;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.82,
      vertexColors: true,
      transparent: true,
      opacity: 0.44,
      depthWrite: false,
      sizeAttenuation: true
    });
    const stars = new THREE.Points(geometry, material);
    this.deepSpaceGroup.add(stars);

    for (let layer = 0; layer < 3; layer++) {
      const dustCount = 420;
      const dustPositions = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 260 + Math.random() * 540;
        dustPositions[i * 3] = Math.cos(angle) * radius;
        dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 260 + layer * 90 - 90;
        dustPositions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
      const dustMaterial = new THREE.PointsMaterial({
        color: layer === 1 ? 0x615177 : 0x38526b,
        size: 1.8,
        transparent: true,
        opacity: 0.065,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const dust = new THREE.Points(dustGeometry, dustMaterial);
      dust.rotation.set(layer * 0.55, layer * 0.9, layer * 0.28);
      this.deepSpaceGroup.add(dust);
    }
  }

  createGlowTexture(colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.3, colorHex);
    gradient.addColorStop(0.7, colorHex + '55');
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }

  createNebulaDiscTexture(primaryHex, secondaryHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const center = canvas.width / 2;

    const coreGradient = ctx.createRadialGradient(center, center, 0, center, center, 240);
    coreGradient.addColorStop(0, 'rgba(255,255,255,0.82)');
    coreGradient.addColorStop(0.08, `${primaryHex}aa`);
    coreGradient.addColorStop(0.34, `${primaryHex}38`);
    coreGradient.addColorStop(0.72, `${secondaryHex}12`);
    coreGradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = coreGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(center, center);
    ctx.globalCompositeOperation = 'screen';
    ctx.lineCap = 'round';
    for (let arm = 0; arm < 4; arm++) {
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        for (let step = 0; step <= 100; step++) {
          const progress = step / 100;
          const radius = 12 + progress * (185 + layer * 12);
          const angle = arm * Math.PI / 2 + progress * Math.PI * 2.05 + layer * 0.07;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.82;
          if (step === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = layer === 0 ? `${primaryHex}66` : `${secondaryHex}32`;
        ctx.lineWidth = layer === 0 ? 10 : 5;
        ctx.shadowBlur = layer === 0 ? 18 : 10;
        ctx.shadowColor = layer === 0 ? primaryHex : secondaryHex;
        ctx.stroke();
      }
    }
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    texture.needsUpdate = true;
    return texture;
  }

  createPlanetTexture(track) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const seedBase = this.hashString(`${track.id}-${track.songName}-${track.artist}`);
    let seed = seedBase || 1;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const primary = new THREE.Color(track.palette.primary);
    const secondary = new THREE.Color(track.palette.secondary);
    const dark = primary.clone().multiplyScalar(0.12);
    const baseGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    baseGradient.addColorStop(0, `#${dark.getHexString()}`);
    baseGradient.addColorStop(0.48, `#${primary.clone().multiplyScalar(0.55).getHexString()}`);
    baseGradient.addColorStop(1, `#${secondary.clone().multiplyScalar(0.18).getHexString()}`);
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'screen';
    for (let band = 0; band < 18; band++) {
      const y = random() * canvas.height;
      const height = 2 + random() * 12;
      const color = primary.clone().lerp(secondary, random());
      ctx.fillStyle = `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${0.08 + random() * 0.22})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= canvas.width; x += 16) {
        ctx.lineTo(x, y + Math.sin(x * 0.055 + random() * 2.5) * height);
      }
      ctx.lineTo(canvas.width, y + height);
      ctx.lineTo(0, y + height);
      ctx.closePath();
      ctx.fill();
    }

    for (let spot = 0; spot < 70; spot++) {
      const color = primary.clone().lerp(secondary, random());
      ctx.fillStyle = `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${0.08 + random() * 0.28})`;
      ctx.beginPath();
      ctx.ellipse(random() * canvas.width, random() * canvas.height, 1 + random() * 8, 0.5 + random() * 3, random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    const texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }

  createAtmosphereMaterial(color) {
    return new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color(color) } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDirection;
        void main() {
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewDirection = normalize(-modelViewPosition.xyz);
          gl_Position = projectionMatrix * modelViewPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vViewDirection;
        void main() {
          float fresnel = pow(1.0 - max(dot(vNormal, vViewDirection), 0.0), 2.35);
          gl_FragColor = vec4(glowColor, fresnel * 0.72);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.FrontSide
    });
  }

  hashString(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  disposeObject3D(object) {
    object.traverse(child => {
      if (child.geometry) child.geometry.dispose();
      const materials = child.material
        ? (Array.isArray(child.material) ? child.material : [child.material])
        : [];
      materials.forEach(material => {
        Object.values(material).forEach(value => {
          if (value && value.isTexture) value.dispose();
        });
        material.dispose();
      });
    });
  }

  serializeTrack(track) {
    return {
      id: track.id,
      songName: track.songName,
      artist: track.artist,
      genre: track.genre,
      playCount: track.playCount,
      energy: track.energy,
      releaseYear: track.releaseYear,
      tagline: track.tagline,
      album: track.album,
      duration: track.duration,
      lastPlayed: track.lastPlayed,
      mood: track.mood,
      language: track.language,
      spotifyId: track.spotifyId,
      spotifyUrl: track.spotifyUrl,
      previewUrl: track.previewUrl
    };
  }

  loadUniverseStore() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.universes) || parsed.universes.length === 0) return false;
      const validUniverses = parsed.universes.filter(universe => Array.isArray(universe.tracks));
      const activeExists = validUniverses.some(universe => universe.id === parsed.activeId);
      this.universeStore = {
        version: 1,
        activeId: activeExists ? parsed.activeId : validUniverses[0]?.id,
        universes: validUniverses
      };
      return this.universeStore.universes.length > 0;
    } catch (error) {
      console.warn('Saved universes could not be restored:', error);
      return false;
    }
  }

  saveUniverseStore() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.universeStore));
    } catch (error) {
      console.warn('Universe archive could not be saved:', error);
      this.showToast('Browser storage is unavailable; this universe is temporary.');
    }
  }

  createUniverseId() {
    return `universe_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  createStarterUniverse(data) {
    const now = new Date().toISOString();
    const id = this.createUniverseId();
    this.universeStore = {
      version: 1,
      activeId: id,
      universes: [{
        id,
        name: 'Demo Universe',
        createdAt: now,
        updatedAt: now,
        tracks: data.tracks.map(track => this.serializeTrack(track))
      }]
    };
    this.currentUniverseId = id;
    this.currentUniverseName = 'Demo Universe';
    this.currentTracks = data.tracks;
    this.saveUniverseStore();
    this.buildGalaxy(data.tracks, data.stats, data.nebulae);
    this.updateCurrentUniverseUI();
  }

  activateUniverse(universeId, announce = true) {
    const universe = this.universeStore.universes.find(item => item.id === universeId);
    if (!universe) return;

    this.clearCommunityVisitState();
    const data = this.dataLoader.processData(universe.tracks);
    this.universeStore.activeId = universe.id;
    this.currentUniverseId = universe.id;
    this.currentUniverseName = universe.name;
    this.currentTracks = data.tracks;
    this.saveUniverseStore();
    this.buildGalaxy(data.tracks, data.stats, data.nebulae);
    this.updateCurrentUniverseUI();
    this.resetCamera(!announce);
    this.renderUniverseArchive();
    if (announce) {
      this.showToast(I18N[this.currentLang].toastSwitched.replace('{name}', universe.name));
    }
  }

  updateActiveUniverse(data) {
    const universe = this.universeStore.universes.find(item => item.id === this.currentUniverseId);
    if (!universe) return;
    universe.tracks = data.tracks.map(track => this.serializeTrack(track));
    universe.updatedAt = new Date().toISOString();
    this.currentTracks = data.tracks;
    this.saveUniverseStore();
  }

  updateCurrentUniverseUI() {
    const label = document.getElementById('current-universe-name');
    if (label) label.textContent = this.currentUniverseName;
  }

  trackIdentity(track) {
    if (track.spotifyId) return `spotify:${track.spotifyId}`;
    return `${track.songName || ''}|${track.artist || ''}`.trim().toLowerCase();
  }

  mergeTrackCollections(existing, incoming) {
    const merged = existing.map(track => this.serializeTrack(track));
    const identities = new Set(merged.map(track => this.trackIdentity(track)));
    let added = 0;
    incoming.forEach(track => {
      const identity = this.trackIdentity(track);
      if (!identities.has(identity)) {
        merged.push(this.serializeTrack(track));
        identities.add(identity);
        added++;
      }
    });
    return { merged, added };
  }

  createUniverseFromData(data, requestedName) {
    const now = new Date().toISOString();
    const id = this.createUniverseId();
    const fallbackName = `Music Universe ${this.universeStore.universes.length + 1}`;
    const name = String(requestedName || '').trim() || fallbackName;
    this.universeStore.universes.unshift({
      id,
      name,
      createdAt: now,
      updatedAt: now,
      tracks: data.tracks.map(track => this.serializeTrack(track))
    });
    this.universeStore.activeId = id;
    this.currentUniverseId = id;
    this.currentUniverseName = name;
    this.currentTracks = data.tracks;
    this.saveUniverseStore();
    return name;
  }

  renderUniverseArchive() {
    const list = document.getElementById('universe-archive-list');
    if (!list) return;
    const dict = I18N[this.currentLang];
    list.innerHTML = '';

    this.universeStore.universes.forEach((universe, index) => {
      const card = document.createElement('article');
      card.className = 'universe-archive-card';
      card.classList.toggle('active', universe.id === this.currentUniverseId);
      card.style.setProperty('--archive-hue', String((index * 57 + 188) % 360));

      const orbit = document.createElement('div');
      orbit.className = 'archive-orbit-visual';
      orbit.innerHTML = '<span></span><i></i>';

      const copy = document.createElement('div');
      copy.className = 'archive-card-copy';
      const name = document.createElement('h3');
      name.textContent = universe.name;
      const meta = document.createElement('p');
      const trackText = dict.archiveTracks.replace('{count}', universe.tracks.length);
      const dateText = new Date(universe.updatedAt || universe.createdAt).toLocaleDateString();
      meta.textContent = `${trackText} · ${dateText}`;
      copy.append(name, meta);

      const action = document.createElement('button');
      action.type = 'button';
      action.className = 'archive-open-btn';
      const isActive = !this.currentCommunityId && universe.id === this.currentUniverseId;
      action.textContent = isActive ? dict.archiveActive : dict.archiveOpen;
      action.disabled = isActive;
      action.addEventListener('click', () => {
        this.activateUniverse(universe.id);
        this.closeUniverseModal();
      });

      card.append(orbit, copy, action);
      list.appendChild(card);
    });
  }

  renderUniverseLinks(nebulae) {
    while (this.universeLinkGroup.children.length > 0) {
      const child = this.universeLinkGroup.children[0];
      this.disposeObject3D(child);
      this.universeLinkGroup.remove(child);
    }

    const centers = Object.values(nebulae).map(cluster => cluster.center);
    if (centers.length < 2) return;
    const points = [];
    for (let i = 0; i < centers.length; i++) {
      const next = centers[(i + 1) % centers.length];
      points.push(
        new THREE.Vector3(centers[i].x, centers[i].y, centers[i].z),
        new THREE.Vector3(next.x, next.y, next.z)
      );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x6688aa,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.universeLinkGroup.add(new THREE.LineSegments(geometry, material));
  }

  renderVolumetricNebulae(nebulae) {
    while (this.nebulaGroup.children.length > 0) {
      const obj = this.nebulaGroup.children[0];
      this.disposeObject3D(obj);
      this.nebulaGroup.remove(obj);
    }

    this.nebulaMarkers.forEach(m => m.element.remove());
    this.nebulaMarkers = [];

    const labelsContainer = document.getElementById('labels-container');

    for (const genreName in nebulae) {
      const cluster = nebulae[genreName];
      const { palette, center } = cluster;

      const particleCount = 2100;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const baseColor = new THREE.Color(palette.primary);
      const secColor = new THREE.Color(palette.secondary);

      for (let i = 0; i < particleCount; i++) {
        const armCount = 4;
        const radius = 4 + Math.pow(Math.random(), 0.7) * 66;
        const arm = i % armCount;
        const armAngle = (arm / armCount) * Math.PI * 2;
        const twist = radius * 0.095;
        const scatter = (Math.random() - 0.5) * (0.32 + radius * 0.018);
        const theta = armAngle + twist + scatter;
        const verticalNoise = Math.random() + Math.random() + Math.random() - 1.5;
        const verticalSpread = verticalNoise * (9 + radius * 0.28);

        positions[i * 3] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = verticalSpread;
        positions[i * 3 + 2] = Math.sin(theta) * radius;

        const mixRatio = Math.min(1, radius / 70 + Math.random() * 0.22);
        const c = baseColor.clone().lerp(secColor, mixRatio);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleTexture = this.createGlowTexture(palette.primary);
      const particleMat = new THREE.PointsMaterial({
        map: particleTexture,
        size: 1.55,
        vertexColors: true,
        transparent: true,
        opacity: 0.64,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        alphaTest: 0.015
      });

      const spiralCloud = new THREE.Points(geometry, particleMat);
      const cloudIndex = this.nebulaGroup.children.length;
      const galaxyGroup = new THREE.Group();
      galaxyGroup.position.set(center.x, center.y, center.z);
      galaxyGroup.userData = {
        phase: cloudIndex * 0.9 + Math.random() * 0.5,
        spinSpeed: 0.035 + cloudIndex * 0.004,
        baseTiltX: 0.48 + Math.random() * 0.3,
        baseTiltZ: (Math.random() - 0.5) * 0.52
      };

      const discMaterial = new THREE.MeshBasicMaterial({
        map: this.createNebulaDiscTexture(palette.primary, palette.secondary),
        transparent: true,
        opacity: 0.27,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const nebulaDisc = new THREE.Mesh(new THREE.CircleGeometry(72, 96), discMaterial);
      nebulaDisc.rotation.x = -Math.PI / 2;
      nebulaDisc.scale.y = 0.82;
      galaxyGroup.add(nebulaDisc);
      galaxyGroup.add(spiralCloud);

      const haloCount = 920;
      const haloGeometry = new THREE.BufferGeometry();
      const haloPositions = new Float32Array(haloCount * 3);
      const haloColors = new Float32Array(haloCount * 3);
      for (let i = 0; i < haloCount; i++) {
        const radius = 22 + Math.pow(Math.random(), 0.55) * 62;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        haloPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        haloPositions[i * 3 + 1] = radius * Math.cos(phi) * 0.62;
        haloPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        const c = baseColor.clone().lerp(secColor, Math.random());
        haloColors[i * 3] = c.r;
        haloColors[i * 3 + 1] = c.g;
        haloColors[i * 3 + 2] = c.b;
      }
      haloGeometry.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3));
      haloGeometry.setAttribute('color', new THREE.BufferAttribute(haloColors, 3));
      const haloMaterial = new THREE.PointsMaterial({
        map: this.createGlowTexture(palette.secondary),
        size: 0.88,
        vertexColors: true,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        alphaTest: 0.01
      });
      const haloCloud = new THREE.Points(haloGeometry, haloMaterial);
      haloCloud.rotation.y = Math.PI / 4;
      galaxyGroup.add(haloCloud);

      const coreMaterial = new THREE.SpriteMaterial({
        map: this.createGlowTexture(palette.primary),
        color: new THREE.Color(palette.primary),
        transparent: true,
        opacity: 0.54,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const coreGlow = new THREE.Sprite(coreMaterial);
      coreGlow.scale.set(36, 36, 1);
      galaxyGroup.add(coreGlow);
      this.nebulaGroup.add(galaxyGroup);

      const markerEl = document.createElement('div');
      markerEl.className = 'nebula-region-marker';
      markerEl.textContent = `${genreName.toUpperCase()} GALAXY`;
      markerEl.style.color = palette.primary;
      labelsContainer.appendChild(markerEl);

      this.nebulaMarkers.push({
        element: markerEl,
        worldPosition: new THREE.Vector3(center.x, center.y + 28, center.z)
      });
    }
  }

  buildGalaxy(tracks, stats, nebulae) {
    this.clearStarGroup();

    const labelsContainer = document.getElementById('labels-container');
    labelsContainer.innerHTML = '';
    this.labelElements = [];

    this.renderVolumetricNebulae(nebulae);

    tracks.forEach(track => {
      const { position, palette, size, pulsateSpeed, emissiveIntensity } = track;

      const sphereGeo = new THREE.SphereGeometry(1, 32, 24);
      const planetTexture = this.createPlanetTexture(track);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: planetTexture,
        emissive: new THREE.Color(palette.glow),
        emissiveMap: planetTexture,
        emissiveIntensity: (emissiveIntensity || 0.85) * 0.42,
        roughness: 0.58,
        metalness: 0.18
      });

      const planetMesh = new THREE.Mesh(sphereGeo, sphereMat);
      planetMesh.position.set(position.x, position.y, position.z);

      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.12, 28, 20),
        this.createAtmosphereMaterial(palette.primary)
      );
      planetMesh.add(atmosphere);

      const texture = this.createGlowTexture(palette.primary);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.58
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(3.4, 3.4, 1);
      planetMesh.add(sprite);

      const planetHash = this.hashString(`${track.id}-${track.songName}`);
      let ring = null;
      if (planetHash % 3 === 0) {
        const ringGeometry = new THREE.RingGeometry(1.35, 1.72, 72);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(palette.secondary),
          transparent: true,
          opacity: 0.28,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI * (0.33 + (planetHash % 17) / 70);
        ring.rotation.y = Math.PI * 0.18;
        planetMesh.add(ring);
      }

      planetMesh.userData = {
        track,
        originalScale: size,
        pulsateSpeed,
        phase: Math.random() * Math.PI * 2,
        axialTilt: ((planetHash % 31) / 31 - 0.5) * 0.45,
        ring
      };

      this.starGroup.add(planetMesh);
      this.starMeshes.push(planetMesh);

      const labelEl = document.createElement('div');
      labelEl.className = 'planet-label';
      labelEl.innerHTML = `
        <span class="title">${track.songName}</span>
        <span class="artist">${track.artist}</span>
      `;
      labelEl.style.borderColor = palette.primary + '88';

      labelEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectStar(planetMesh);
      });

      labelsContainer.appendChild(labelEl);

      this.labelElements.push({
        element: labelEl,
        planetMesh,
        worldPosition: planetMesh.position
      });
    });

    document.getElementById('stat-count').textContent = stats.totalTracks;
    document.getElementById('stat-plays').textContent = stats.totalPlays.toLocaleString();
    document.getElementById('stat-genre').textContent = stats.topGenre;
    this.renderGalaxyNavigation(nebulae);
    this.renderUniverseLinks(nebulae);
  }

  renderGalaxyNavigation(nebulae) {
    this.currentNebulae = nebulae;
    const list = document.getElementById('galaxy-nav-list');
    if (!list) return;

    list.innerHTML = '';
    Object.entries(nebulae).forEach(([genreName, cluster]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'galaxy-nav-item';
      button.dataset.genre = genreName;
      button.style.setProperty('--galaxy-color', cluster.palette.primary);

      const marker = document.createElement('span');
      marker.className = 'galaxy-nav-dot';
      const name = document.createElement('span');
      name.className = 'galaxy-nav-name';
      name.textContent = genreName;
      const count = document.createElement('span');
      count.className = 'galaxy-nav-count';
      count.textContent = String(cluster.count);

      button.append(marker, name, count);
      button.addEventListener('click', event => {
        event.stopPropagation();
        this.focusGalaxy(genreName);
      });
      list.appendChild(button);
    });
  }

 focusGalaxy(genreName) {
  const cluster = this.currentNebulae?.[genreName];
  if (!cluster) return;

  this.closeStarCard();

  const center = new THREE.Vector3(
    cluster.center.x,
    cluster.center.y,
    cluster.center.z
  );

  this.controlsTargetPos = center.clone();
  this.cameraTargetPos = center.clone().add(
    new THREE.Vector3(85, 75, 115)
  );
  this.isCameraAnimating = true;

  document.querySelectorAll('.galaxy-nav-item').forEach(button => {
    button.classList.toggle(
      'active',
      button.dataset.genre === genreName
    );
  });

  const message = I18N[this.currentLang].navFocused
    .replace('{genre}', genreName);

  this.showToast(message);
}

  clearStarGroup() {
    while (this.starGroup.children.length > 0) {
      const obj = this.starGroup.children[0];
      this.disposeObject3D(obj);
      this.starGroup.remove(obj);
    }
    this.starMeshes = [];
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    this.starMeshes.forEach(mesh => {
      const { originalScale, pulsateSpeed, phase, axialTilt, ring } = mesh.userData;
      const pulse = Math.sin(time * pulsateSpeed + phase) * 0.065 + 1.0;
      const hoverMultiplier = (mesh === this.hoveredStar || mesh === this.selectedStar) ? 1.4 : 1.0;
      const scale = originalScale * pulse * hoverMultiplier;
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.y = time * pulsateSpeed * 0.5;
      mesh.rotation.z = axialTilt;
      if (ring) ring.rotation.z = time * -0.08 + phase;
    });

    // Each particle cloud rotates around its own galaxy center. This restores
    // visible motion without allowing the nebula to drift away from its stars.
    this.nebulaGroup.children.forEach(cloud => {
      const { phase, spinSpeed, baseTiltX, baseTiltZ } = cloud.userData;
      cloud.rotation.y = time * spinSpeed + phase;
      cloud.rotation.x = baseTiltX + Math.sin(time * 0.22 + phase) * 0.055;
      cloud.rotation.z = baseTiltZ + Math.cos(time * 0.18 + phase) * 0.04;
    });

    this.deepSpaceGroup.rotation.y = time * 0.0025;
    this.deepSpaceGroup.rotation.x = Math.sin(time * 0.025) * 0.018;

    if (this.selectedStar && this.selectedPulseMesh) {
      const worldPos = new THREE.Vector3();
      this.selectedStar.getWorldPosition(worldPos);
      this.selectedPulseMesh.position.copy(worldPos);

      const pulseScale = (Math.sin(time * 6) * 0.4 + 1.6) * this.selectedStar.userData.originalScale;
      this.selectedPulseMesh.scale.set(pulseScale, pulseScale, pulseScale);
      this.selectedPulseMesh.material.opacity = Math.sin(time * 6) * 0.35 + 0.55;
    } else if (this.selectedPulseMesh) {
      this.selectedPulseMesh.material.opacity = 0;
    }

    if (this.isCameraAnimating) {
      this.camera.position.lerp(this.cameraTargetPos, 0.07);
      this.controls.target.lerp(this.controlsTargetPos, 0.07);

      if (this.camera.position.distanceTo(this.cameraTargetPos) < 0.3) {
        this.isCameraAnimating = false;
      }
    }

    this.controls.update();
    this.updateScreenLabels();
    this.renderer.render(this.scene, this.camera);
  }

  updateScreenLabels() {
    const tempV = new THREE.Vector3();
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;

    this.labelElements.forEach(item => {
      const { element, planetMesh } = item;
      planetMesh.getWorldPosition(tempV);

      const distToCam = this.camera.position.distanceTo(tempV);
      tempV.project(this.camera);

      if (tempV.z > 1 || distToCam > 550) {
        element.style.display = 'none';
        return;
      }

      element.style.display = 'flex';
      const x = (tempV.x * halfW) + halfW;
      const y = (-(tempV.y * halfH)) + halfH - (planetMesh.userData.originalScale * 6);

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      const opacity = Math.max(0.1, Math.min(1.0, 1 - (distToCam / 450)));
      element.style.opacity = opacity;
    });

    this.nebulaMarkers.forEach(item => {
      const { element, worldPosition } = item;
      tempV.copy(worldPosition);
      const distToCam = this.camera.position.distanceTo(tempV);
      tempV.project(this.camera);

      if (tempV.z > 1 || distToCam > 1100) {
        element.style.display = 'none';
        return;
      }

      element.style.display = 'block';
      const x = (tempV.x * halfW) + halfW;
      const y = (-(tempV.y * halfH)) + halfH;

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = Math.max(0.3, Math.min(1.0, (distToCam / 300)));
    });
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('mousedown', (e) => this.onPointerDown(e));
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => this.onPointerUp());
    window.addEventListener('click', (e) => this.onClick(e));

    document.getElementById('btn-guide').addEventListener('click', () => this.openGuideModal());
    document.getElementById('btn-close-guide').addEventListener('click', () => this.closeGuideModal());
    document.getElementById('btn-got-it').addEventListener('click', () => this.closeGuideModal());

    document.getElementById('btn-reset-view').addEventListener('click', () => this.resetCamera());
    document.getElementById('btn-universe-archive').addEventListener('click', () => this.openUniverseModal());
    document.getElementById('btn-close-universe-modal').addEventListener('click', () => this.closeUniverseModal());
    document.getElementById('btn-close-universe-list').addEventListener('click', () => this.closeUniverseModal());
    document.getElementById('btn-community').addEventListener('click', () => this.openCommunityModal());
    document.getElementById('btn-close-community').addEventListener('click', () => this.closeCommunityModal());
    document.getElementById('btn-close-community-chat').addEventListener('click', () => this.closeCommunityChat());
    document.getElementById('btn-return-home').addEventListener('click', () => this.returnToHomeUniverse());
    document.getElementById('community-chat-form').addEventListener('submit', event => {
      event.preventDefault();
      this.sendCommunityMessage();
    });
    document.getElementById('btn-close-card').addEventListener('click', () => this.exitStarDetail());
    document.getElementById('btn-open-modal').addEventListener('click', () => this.openUploadModal());
    document.getElementById('btn-close-modal').addEventListener('click', () => this.closeUploadModal());
    document.getElementById('btn-cancel-modal').addEventListener('click', () => this.closeUploadModal());
    document.getElementById('btn-render-universe').addEventListener('click', () => this.handleCustomDataUpload());
    document.getElementById('btn-load-sample').addEventListener('click', () => this.insertSampleTemplate());
    document.getElementById('btn-load-csv-sample').addEventListener('click', () => this.insertCsvSampleTemplate());
    document.getElementById('btn-choose-file').addEventListener('click', event => {
      event.stopPropagation();
      document.getElementById('file-input').click();
    });
    document.getElementById('file-input').addEventListener('change', (e) => this.handleFileSelect(e));

    const importDropzone = document.getElementById('import-dropzone');
    const importInput = document.getElementById('json-input');
    importDropzone.addEventListener('click', () => document.getElementById('file-input').click());
    importDropzone.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        document.getElementById('file-input').click();
      }
    });
    ['dragenter', 'dragover'].forEach(type => importDropzone.addEventListener(type, event => {
      event.preventDefault();
      importDropzone.classList.add('drag-active');
    }));
    ['dragleave', 'drop'].forEach(type => importDropzone.addEventListener(type, event => {
      event.preventDefault();
      importDropzone.classList.remove('drag-active');
    }));
    importDropzone.addEventListener('drop', event => this.loadImportFile(event.dataTransfer.files[0]));
    importInput.addEventListener('input', () => this.updateDetectedImportFormat(importInput.value));
    document.querySelectorAll('input[name="import-mode"]').forEach(input => {
      input.addEventListener('change', () => this.updateImportModeUI());
    });

    document.getElementById('btn-toggle-galaxy-nav').addEventListener('click', event => {
      event.stopPropagation();
      const nav = document.getElementById('galaxy-nav');
      nav.classList.toggle('collapsed');
      this.updateGalaxyNavToggleAccessibility();
    });

    // Spotify preview button — controls the official Spotify iFrame API player.
    document.getElementById('btn-preview-audio').addEventListener('click', () => this.toggleSpotifyPreview());

    document.getElementById('btn-toggle-audio').addEventListener('click', () => {
      this.audioEnabled = !this.audioEnabled;
      const dict = I18N[this.currentLang];
      document.getElementById('audio-btn-text').textContent = this.audioEnabled ? dict.btnAudioOn : dict.btnAudioOff;
      this.showToast(this.audioEnabled ? "Audio SFX Enabled" : "Audio SFX Muted");
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setLanguage(e.target.getAttribute('data-lang'));
      });
    });
  }

  openGuideModal() {
    document.getElementById('guide-modal').classList.add('active');
  }

  closeGuideModal() {
    document.getElementById('guide-modal').classList.remove('active');
  }

  openUniverseModal() {
    this.renderUniverseArchive();
    document.getElementById('universe-modal').classList.add('active');
  }

  closeUniverseModal() {
    document.getElementById('universe-modal').classList.remove('active');
  }

  getCommunityProfile(profileId) {
    return this.communityProfiles.find(profile => profile.id === profileId);
  }

  openCommunityModal() {
    this.renderCommunityProfiles();
    document.getElementById('community-modal').classList.add('active');
  }

  closeCommunityModal() {
    document.getElementById('community-modal').classList.remove('active');
  }

  renderCommunityProfiles() {
    const list = document.getElementById('community-profile-list');
    if (!list) return;
    const dict = I18N[this.currentLang];
    list.innerHTML = '';

    this.communityProfiles.forEach(profile => {
      const card = document.createElement('article');
      card.className = 'community-profile-card';
      card.style.setProperty('--community-color', profile.accent);

      const top = document.createElement('div');
      top.className = 'community-profile-top';
      const avatar = document.createElement('div');
      avatar.className = 'community-profile-avatar';
      avatar.textContent = profile.avatar;
      const live = document.createElement('span');
      live.className = 'community-live-badge';
      live.textContent = dict.communityLive;
      top.append(avatar, live);

      const owner = document.createElement('div');
      owner.className = 'community-profile-owner';
      const genre = document.createElement('span');
      genre.textContent = `${profile.genre.toUpperCase()} UNIVERSE`;
      const name = document.createElement('h3');
      name.textContent = profile.universeName;
      const description = document.createElement('p');
      description.textContent = profile.description[this.currentLang] || profile.description.en;
      const meta = document.createElement('div');
      meta.className = 'community-profile-meta';
      meta.textContent = `${profile.owner} · ${dict.communityTracks.replace('{count}', profile.tracks.length).replace('{genre}', profile.genre)}`;
      owner.append(genre, name, description, meta);

      const actions = document.createElement('div');
      actions.className = 'community-profile-actions';
      const visit = document.createElement('button');
      visit.type = 'button';
      visit.textContent = dict.communityVisit;
      visit.addEventListener('click', () => this.visitCommunityUniverse(profile.id));
      const chat = document.createElement('button');
      chat.type = 'button';
      chat.textContent = dict.communityChat;
      chat.addEventListener('click', () => this.openCommunityChat(profile.id));
      actions.append(visit, chat);

      card.append(top, owner, actions);
      list.appendChild(card);
    });
  }

  visitCommunityUniverse(profileId) {
    const profile = this.getCommunityProfile(profileId);
    if (!profile) return;
    if (!this.currentCommunityId) this.homeUniverseId = this.currentUniverseId;

    const data = this.dataLoader.processData(profile.tracks);
    this.currentCommunityId = profile.id;
    this.currentTracks = data.tracks;
    this.closeStarCard();
    this.buildGalaxy(data.tracks, data.stats, data.nebulae);
    const guestCluster = data.nebulae[profile.genre] || Object.values(data.nebulae)[0];
    if (guestCluster) {
      const center = new THREE.Vector3(guestCluster.center.x, guestCluster.center.y, guestCluster.center.z);
      this.controlsTargetPos = center.clone();
      this.cameraTargetPos = center.clone().add(new THREE.Vector3(85, 75, 115));
      this.isCameraAnimating = true;
    } else {
      this.resetCamera(true);
    }
    this.closeCommunityModal();

    const banner = document.getElementById('community-visit-banner');
    document.getElementById('community-visit-name').textContent = profile.universeName;
    banner.style.setProperty('--chat-color', profile.accent);
    banner.classList.add('active');

    this.showToast(I18N[this.currentLang].communityVisitToast.replace('{name}', profile.universeName));
  }

  clearCommunityVisitState() {
    this.currentCommunityId = null;
    document.getElementById('community-visit-banner')?.classList.remove('active');
  }

  returnToHomeUniverse() {
    const universeId = this.homeUniverseId || this.universeStore.activeId;
    this.clearCommunityVisitState();
    this.homeUniverseId = null;
    this.activateUniverse(universeId, false);
    this.showToast(I18N[this.currentLang].communityReturnToast.replace('{name}', this.currentUniverseName));
  }

  getCommunityGreeting(profile) {
    const greetings = {
      en: {
        rock: `Rex here. Plug in and tell me what kind of riff your day needs.`,
        rnb: `Hey, it’s Maya. Tell me the mood and I’ll find something that sits gently in it.`,
        pop: `Lumi online ✦ Give me a mood, a moment, or a chorus you can’t stop replaying.`
      },
      es: {
        rock: `Soy Rex. Conecta el amplificador y dime qué riff necesita tu día.`,
        rnb: `Hola, soy Maya. Cuéntame el ánimo y buscaré una canción que encaje suavemente.`,
        pop: `Lumi en línea ✦ Dame un ánimo, un momento o un estribillo que no puedas soltar.`
      },
      zh: {
        rock: `Rex 上线。接好音箱，告诉我你今天需要哪种 riff。`,
        rnb: `嗨，我是 Maya。告诉我此刻的情绪，我帮你找一首能温柔落进去的歌。`,
        pop: `Lumi 已上线 ✦ 给我一种心情、一个场景，或一段你停不下来的副歌。`
      }
    };
    return greetings[this.currentLang]?.[profile.id] || greetings.en[profile.id];
  }

  getCommunityApiConfig() {
    const config = window.MUSIC_UNIVERSE_CHAT_API;
    return config && typeof config.endpoint === 'string' && config.endpoint.trim() ? config : null;
  }

  openCommunityChat(profileId) {
    const profile = this.getCommunityProfile(profileId);
    if (!profile) return;
    this.activeCommunityChatId = profileId;
    if (!this.communityChatHistory[profileId]) {
      this.communityChatHistory[profileId] = [{ role: 'assistant', content: this.getCommunityGreeting(profile) }];
    }
    this.closeCommunityModal();
    this.renderCommunityChat();
    const panel = document.getElementById('community-chat-panel');
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
    document.getElementById('community-chat-input').focus();
  }

  closeCommunityChat() {
    const panel = document.getElementById('community-chat-panel');
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
  }

  renderCommunityChat() {
    const profile = this.getCommunityProfile(this.activeCommunityChatId);
    if (!profile) return;
    const dict = I18N[this.currentLang];
    const panel = document.getElementById('community-chat-panel');
    panel.style.setProperty('--chat-color', profile.accent);
    document.getElementById('community-chat-avatar').textContent = profile.avatar;
    document.getElementById('community-chat-name').textContent = profile.owner;
    document.getElementById('community-chat-genre').textContent = `${profile.genre.toUpperCase()} SIGNAL`;
    document.getElementById('community-chat-status').textContent = this.getCommunityApiConfig() && !this.communityApiFailures.has(profile.id)
      ? dict.communityApiReady
      : dict.communityLocalMode;

    const messages = document.getElementById('community-chat-messages');
    messages.innerHTML = '';
    (this.communityChatHistory[profile.id] || []).forEach(message => {
      const bubble = document.createElement('div');
      bubble.className = `community-message ${message.role}`;
      bubble.textContent = message.content;
      messages.appendChild(bubble);
    });
    messages.scrollTop = messages.scrollHeight;

    const prompts = document.getElementById('community-chat-prompts');
    prompts.innerHTML = '';
    [dict.communityQuickRecommend, dict.communityQuickMood, dict.communityQuickFavorite].forEach(label => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => this.sendCommunityMessage(label));
      prompts.appendChild(button);
    });
  }

  async sendCommunityMessage(presetMessage = '') {
    const profile = this.getCommunityProfile(this.activeCommunityChatId);
    if (!profile) return;
    const input = document.getElementById('community-chat-input');
    const message = String(presetMessage || input.value || '').trim();
    if (!message) return;
    input.value = '';
    input.disabled = true;

    const history = this.communityChatHistory[profile.id] || [];
    history.push({ role: 'user', content: message });
    this.communityChatHistory[profile.id] = history;
    this.renderCommunityChat();

    const messages = document.getElementById('community-chat-messages');
    const typing = document.createElement('div');
    typing.className = 'community-message assistant typing';
    typing.textContent = I18N[this.currentLang].communityThinking;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    let reply;
    const config = this.communityApiFailures.has(profile.id) ? null : this.getCommunityApiConfig();
    if (config) {
      try {
        reply = await this.requestCommunityApiReply(profile, history, config);
        this.communityApiFailures.delete(profile.id);
      } catch (error) {
        reply = this.generateLocalCommunityReply(profile, message);
        this.communityApiFailures.add(profile.id);
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 320));
      reply = this.generateLocalCommunityReply(profile, message);
    }

    history.push({ role: 'assistant', content: reply });
    input.disabled = false;
    this.renderCommunityChat();
    input.focus();
  }

  async requestCommunityApiReply(profile, history, config) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model: config.model || undefined,
          persona: {
            id: profile.id,
            name: profile.owner,
            genre: profile.genre,
            systemPrompt: profile.systemPrompt
          },
          messages: history.slice(-12)
        })
      });
      if (!response.ok) throw new Error(`Chat API returned ${response.status}`);
      const data = await response.json();
      const reply = data.reply || data.output_text || data.choices?.[0]?.message?.content;
      if (typeof reply !== 'string' || !reply.trim()) throw new Error('Chat API returned no reply');
      return reply.trim();
    } finally {
      clearTimeout(timeout);
    }
  }

  generateLocalCommunityReply(profile, message) {
    const normalized = message.toLowerCase();
    const hash = Array.from(message).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const song = profile.tracks[hash % profile.tracks.length];
    const wantsFavorite = /favorite|favourite|最喜欢|favorito/.test(normalized);
    const wantsMood = /tonight|mood|今晚|心情|ánimo|noche/.test(normalized);

    const replies = {
      en: {
        rock: wantsFavorite
          ? `Queen is the north star, but I never stay loyal to one amp. “${song.songName}” by ${song.artist} is where I’d turn the volume up today.`
          : wantsMood
            ? `Tonight needs a riff with some air around it. Try “${song.songName}” by ${song.artist}—let it build before you judge it.`
            : `That thought needs more gain. I’d answer it with “${song.songName}” by ${song.artist}: ${song.tagline.toLowerCase()}`,
        rnb: wantsFavorite
          ? `SZA is close to the center of my orbit, but tonight I keep returning to “${song.songName}” by ${song.artist}. It leaves room for the feeling.`
          : wantsMood
            ? `For tonight, I’d dim the lights and play “${song.songName}” by ${song.artist}. ${song.tagline}`
            : `I hear the feeling underneath that. “${song.songName}” by ${song.artist} would sit beside it without rushing you.`,
        pop: wantsFavorite
          ? `Impossible question—but ${song.artist} absolutely knows how to land a hook. Put on “${song.songName}” and wait for the main-character moment ✦`
          : wantsMood
            ? `Tonight’s assignment: “${song.songName}” by ${song.artist}. Bright production, instant lift, zero dead air ✦`
            : `Okay, that deserves a chorus! Try “${song.songName}” by ${song.artist}—${song.tagline.toLowerCase()}`
      },
      es: {
        rock: `Eso pide más amplificador. Prueba “${song.songName}” de ${song.artist}; deja que el riff haga el resto.`,
        rnb: `Entiendo esa emoción. “${song.songName}” de ${song.artist} puede acompañarla sin apresurarla.`,
        pop: `¡Eso necesita un gran estribillo! Pon “${song.songName}” de ${song.artist} y deja que suba la energía ✦`
      },
      zh: {
        rock: wantsFavorite
          ? `Queen 是我的北极星，不过今天我会把音量交给 ${song.artist} 的《${song.songName}》。这首值得把音箱再推高一格。`
          : wantsMood
            ? `今晚需要一段有呼吸感的 riff。试试 ${song.artist} 的《${song.songName}》，先让它慢慢升温，别急着下判断。`
            : `这个想法需要再加一点失真。我会用 ${song.artist} 的《${song.songName}》回应——${song.tagline}`,
        rnb: wantsFavorite
          ? `SZA 很接近我的轨道中心，但今晚我会反复播放 ${song.artist} 的《${song.songName}》。它会给情绪留下空间。`
          : wantsMood
            ? `今晚把灯调暗一点，放 ${song.artist} 的《${song.songName}》吧。${song.tagline}`
            : `我听见了这句话下面的情绪。${song.artist} 的《${song.songName}》会安静地陪着它，不催你往前走。`,
        pop: wantsFavorite
          ? `这问题太难选啦——但 ${song.artist} 真的很会写 hook。播放《${song.songName}》，等那个主角时刻出现 ✦`
          : wantsMood
            ? `今晚的任务：播放 ${song.artist} 的《${song.songName}》。明亮制作、即时提神、没有冷场 ✦`
            : `这句话值得配一个大副歌！试试 ${song.artist} 的《${song.songName}》——${song.tagline}`
      }
    };
    return replies[this.currentLang]?.[profile.id] || replies.en[profile.id];
  }

  onPointerDown(event) {
    if (event.button !== 0) return;
    this.pointerStart = { x: event.clientX, y: event.clientY };
    this.wasPointerDragging = false;
  }

  onPointerUp() {
    this.pointerStart = null;
  }

  onMouseMove(event) {
    if (this.pointerStart) {
      const dx = event.clientX - this.pointerStart.x;
      const dy = event.clientY - this.pointerStart.y;
      if (Math.hypot(dx, dy) > 5) this.wasPointerDragging = true;
    }

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.starMeshes);

    if (intersects.length > 0) {
      const star = intersects[0].object;
      if (this.hoveredStar !== star) {
        this.hoveredStar = star;
        document.body.style.cursor = 'pointer';
      }
    } else {
      if (this.hoveredStar) {
        this.hoveredStar = null;
        document.body.style.cursor = 'default';
      }
    }
  }

  onClick(event) {
    if (this.wasPointerDragging) {
      this.wasPointerDragging = false;
      return;
    }

    if (event.target.closest('.cyber-header') || event.target.closest('.galaxy-nav') || event.target.closest('.star-card') || event.target.closest('.modal-container') || event.target.closest('.planet-label')) {
      return;
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.starMeshes);

    if (intersects.length > 0) {
      this.selectStar(intersects[0].object);
    }
  }

  selectStar(starMesh) {
    this.stopPreviewAudio();

    this.selectedStar = starMesh;
    const track = starMesh.userData.track;

    this.labelElements.forEach(item => {
      if (item.planetMesh === starMesh) {
        item.element.classList.add('selected');
      } else {
        item.element.classList.remove('selected');
      }
    });

    const worldPos = new THREE.Vector3();
    starMesh.getWorldPosition(worldPos);

    const offset = new THREE.Vector3(0, 10, 42);
    this.cameraTargetPos = worldPos.clone().add(offset);
    this.controlsTargetPos = worldPos.clone();
    this.isCameraAnimating = true;

    document.getElementById('card-song-title').textContent = track.songName;
    document.getElementById('card-artist-name').textContent = track.artist;

    const genreBadge = document.getElementById('card-genre-badge');
    genreBadge.textContent = track.genre;
    genreBadge.style.backgroundColor = track.palette.primary + '33';
    genreBadge.style.borderColor = track.palette.primary;
    genreBadge.style.color = track.palette.primary;

    const moodBadge = document.getElementById('card-mood-badge');
    moodBadge.textContent = (track.mood || 'Vibrant').toUpperCase();

    document.getElementById('card-tagline').textContent = track.tagline;
    document.getElementById('card-play-count').textContent = track.playCount.toLocaleString();
    document.getElementById('bar-play-count').style.width = Math.min(100, Math.round(track.playScore * 100)) + '%';

    document.getElementById('card-energy').textContent = track.energy + '%';
    document.getElementById('bar-energy').style.width = track.energy + '%';

    document.getElementById('card-release-year').textContent = track.releaseYear;
    document.getElementById('card-album').textContent = track.album || 'Single';

    const mins = Math.floor(track.duration / 60);
    const secs = String(track.duration % 60).padStart(2, '0');
    document.getElementById('card-duration').textContent = `${mins}:${secs}`;
    document.getElementById('card-last-played').textContent = track.lastPlayed || 'Recent';

    const spotifyBtn = document.getElementById('btn-spotify-link');
    spotifyBtn.href = track.spotifyUrl || (track.spotifyId ? `https://open.spotify.com/track/${track.spotifyId}` : 'https://open.spotify.com');

    // Store the canonical Spotify URI for the official iFrame player.
    this._currentSpotifyUri = track.spotifyUri || (track.spotifyId ? `spotify:track:${track.spotifyId}` : null);
    this._embedVisible = false;
    const embedContainer = document.getElementById('spotify-embed-container');
    if (embedContainer) embedContainer.style.display = 'none';
    this.resetPreviewAudioBtnState();
    document.getElementById('star-card').classList.add('active');

    if (this.audioEnabled) {
      this.playStarPulseSound(track.energy, track.playCount);
    }
  }

  /**
   * Called by Spotify's official iFrame API when its script is ready.
   */
  setSpotifyIframeApi(IFrameAPI) {
    this.spotifyIframeApi = IFrameAPI;
  }

  toggleSpotifyPreview() {
    const embedContainer = document.getElementById('spotify-embed-container');
    const previewBtnText = document.getElementById('preview-btn-text');

    if (!embedContainer || !previewBtnText) return;

    if (this._embedVisible) {
      if (this.spotifyEmbedController) this.spotifyEmbedController.pause();
      embedContainer.style.display = 'none';
      this._embedVisible = false;
      this.resetPreviewAudioBtnState();
      return;
    }

    const dict = I18N[this.currentLang];
    if (!this._currentSpotifyUri) {
      this.showToast(dict.spotifyUnavailable);
      return;
    }

    if (this.spotifyEmbedController) {
      this.spotifyEmbedController.loadEntity(this._currentSpotifyUri);
      this.showSpotifyEmbed();
      this.spotifyEmbedController.play();
      return;
    }

    if (!this.spotifyIframeApi || this.spotifyControllerCreating) {
      this.showToast(dict.spotifyLoading);
      return;
    }

    this.spotifyControllerCreating = true;
    const element = document.getElementById('spotify-embed');
    const options = { uri: this._currentSpotifyUri, width: '100%', height: 152, theme: 'dark' };
    this.spotifyIframeApi.createController(element, options, controller => {
      this.spotifyEmbedController = controller;
      this.spotifyControllerCreating = false;
      controller.loadEntity(this._currentSpotifyUri);
      this.showSpotifyEmbed();
      controller.play();
    });
  }

  showSpotifyEmbed() {
    const embedContainer = document.getElementById('spotify-embed-container');
    const previewBtnText = document.getElementById('preview-btn-text');
    if (!embedContainer || !previewBtnText) return;

    embedContainer.style.display = 'block';
    this._embedVisible = true;
    previewBtnText.textContent = I18N[this.currentLang].btnHidePreview;
    document.getElementById('btn-preview-audio').style.boxShadow = '0 0 18px var(--pink-glow)';
  }

  stopPreviewAudio() {
    const embedContainer = document.getElementById('spotify-embed-container');
    if (this.spotifyEmbedController) this.spotifyEmbedController.pause();
    if (embedContainer) embedContainer.style.display = 'none';
    this._embedVisible = false;
    this.resetPreviewAudioBtnState();
  }

  resetPreviewAudioBtnState() {
    this._embedVisible = false;
    const previewBtnText = document.getElementById('preview-btn-text');
    if (previewBtnText) {
      previewBtnText.textContent = I18N[this.currentLang].btnPlayPreview;
    }
    const btn = document.getElementById('btn-preview-audio');
    if (btn) {
      btn.style.boxShadow = 'none';
    }
  }

  closeStarCard() {
    this.stopPreviewAudio();
    this.selectedStar = null;
    this.labelElements.forEach(item => item.element.classList.remove('selected'));
    document.getElementById('star-card').classList.remove('active');
  }

resetCamera(silent = false) {
  this.closeStarCard();
  this.cameraTargetPos = new THREE.Vector3(230, 125, 430);
  this.controlsTargetPos = new THREE.Vector3(0, 0, 0);
  this.isCameraAnimating = true;

  document.querySelectorAll('.galaxy-nav-item').forEach(button => {
    button.classList.remove('active');
  });

  if (!silent) {
    const dict = I18N[this.currentLang];
    this.showToast(dict.toastReset);
  }
} // resetCamera 必须先在这里结束

exitStarDetail() {
  // 关闭卡片前先记住歌曲所属星系
  const genre = this.selectedStar?.userData?.track?.genre;

  this.closeStarCard();

  if (genre) {
    this.focusGalaxy(genre);
  } else {
    this.resetCamera(true);
  }
}

  openUploadModal() {
    if (this.currentCommunityId) {
      this.showToast(I18N[this.currentLang].communityGuestImport);
      return;
    }
    this.updateCurrentUniverseUI();
    this.updateImportModeUI();
    document.getElementById('upload-modal').classList.add('active');
  }

  closeUploadModal() {
    document.getElementById('upload-modal').classList.remove('active');
  }

  updateImportModeUI() {
    const selected = document.querySelector('input[name="import-mode"]:checked');
    this.importMode = selected ? selected.value : 'merge';
    document.querySelectorAll('.import-mode-card').forEach(card => {
      const radio = card.querySelector('input[name="import-mode"]');
      card.classList.toggle('active', Boolean(radio && radio.checked));
    });

    const nameField = document.getElementById('new-universe-name-field');
    nameField.hidden = this.importMode !== 'new';
    document.getElementById('btn-render-universe').textContent = this.importMode === 'new'
      ? I18N[this.currentLang].importNewAction
      : I18N[this.currentLang].importMergeAction;
  }

  insertSampleTemplate() {
    const sample = [
      {
        "id": "sample_01",
        "songName": "Starboy",
        "artist": "The Weeknd",
        "genre": "R&B",
        "playCount": 342,
        "energy": 88,
        "releaseYear": 2016,
        "tagline": "Late night spiritual R&B pillar",
        "album": "Starboy",
        "duration": 230,
        "lastPlayed": "2026-09-28",
        "mood": "energetic",
        "language": "English",
        "previewUrl": "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=synthwave-80s-110045.mp3"
      },
      {
        "id": "sample_02",
        "songName": "Redbone",
        "artist": "Childish Gambino",
        "genre": "R&B",
        "playCount": 265,
        "energy": 72,
        "releaseYear": 2016,
        "tagline": "Groovy funk R&B vibe",
        "album": "Awaken My Love",
        "duration": 326,
        "lastPlayed": "2026-09-25",
        "mood": "groovy",
        "language": "English",
        "previewUrl": "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3"
      }
    ];
    document.getElementById('json-input').value = JSON.stringify(sample, null, 2);
    this.selectedImportFileName = '';
    this.updateDetectedImportFormat(document.getElementById('json-input').value);
  }

  insertCsvSampleTemplate() {
    const sample = [
      'Track URI,Track Name,Artist Name(s),Album Name,Album Release Date,Track Duration (ms),Track Preview URL,Popularity,Added At,Artist Genres,Energy',
      'spotify:track:7MXVkk9YMctZqd1Srtv4MB,Starboy,The Weeknd,Starboy,2016-11-25,230453,,88,2026-09-28T20:30:00Z,"r&b, pop",0.82',
      'spotify:track:0wXuerDYiBnERgIpbb3JBR,Redbone,Childish Gambino,"Awaken, My Love!",2016-12-02,326933,,84,2026-09-25T21:00:00Z,"r&b, funk",0.72'
    ].join('\n');
    document.getElementById('json-input').value = sample;
    this.selectedImportFileName = '';
    this.updateDetectedImportFormat(sample);
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    this.loadImportFile(file);
    event.target.value = '';
  }

  loadImportFile(file) {
    if (!file) return;
    if (!/\.(json|csv)$/i.test(file.name)) {
      this.showToast('Please choose an Exportify .csv or Spotify .json file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('json-input').value = e.target.result;
      this.selectedImportFileName = file.name;
      const format = this.updateDetectedImportFormat(e.target.result, file.name);
      const status = document.getElementById('import-file-status');
      status.removeAttribute('data-i18n');
      status.textContent = `${file.name} · ${this.formatFileSize(file.size)}`;
      const message = I18N[this.currentLang].toastFileLoaded
        .replace('{name}', file.name)
        .replace('{format}', format);
      this.showToast(message);
    };
    reader.onerror = () => this.showToast(`Could not read ${file.name}.`);
    reader.readAsText(file, 'UTF-8');
  }

  updateDetectedImportFormat(text, fileName = '') {
    const trimmed = String(text || '').replace(/^\uFEFF/, '').trim();
    let format = 'AUTO';
    if (/^[\[{]/.test(trimmed) || /\.json$/i.test(fileName)) format = 'JSON';
    else if (trimmed || /\.csv$/i.test(fileName)) format = 'CSV';

    const badge = document.getElementById('import-detected-format');
    badge.textContent = format;
    badge.dataset.format = format.toLowerCase();
    return format;
  }

  formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  handleCustomDataUpload() {
    const inputText = document.getElementById('json-input').value.trim();
    if (!inputText) {
      this.showToast(I18N[this.currentLang].toastNeedData);
      return;
    }

    try {
      const imported = this.dataLoader.parseUserData(inputText, this.selectedImportFileName);
      const dict = I18N[this.currentLang];
      let data;
      let message;

      if (this.importMode === 'new') {
        data = imported;
        const requestedName = document.getElementById('new-universe-name').value;
        const name = this.createUniverseFromData(data, requestedName);
        message = dict.toastCreated
          .replace('{name}', name)
          .replace('{count}', data.tracks.length);
        document.getElementById('new-universe-name').value = '';
      } else {
        const result = this.mergeTrackCollections(this.currentTracks, imported.tracks);
        data = this.dataLoader.processData(result.merged);
        this.updateActiveUniverse(data);
        message = dict.toastMerged
          .replace('{added}', result.added)
          .replace('{count}', data.tracks.length);
      }

      this.currentTracks = data.tracks;
      this.buildGalaxy(data.tracks, data.stats, data.nebulae);
      this.updateCurrentUniverseUI();
      this.renderUniverseArchive();
      this.closeUploadModal();
      this.resetCamera();
      this.showToast(message);
    } catch (err) {
      const dict = I18N[this.currentLang];
      alert(dict.toastError + err.message);
    }
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      console.warn("Web Audio API unavailable.");
    }
  }

  playStarPulseSound(energy = 70, playCount = 200) {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    const baseFreq = 220 + (energy / 100) * 550;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, this.audioCtx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.45);
  }

  setLanguage(lang) {
    if (!I18N[lang]) return;
    this.currentLang = lang;
    const dict = I18N[lang];

    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.placeholder = dict[key];
    });

    document.getElementById('json-input').placeholder = dict.importPlaceholder;

    document.getElementById('audio-btn-text').textContent = this.audioEnabled ? dict.btnAudioOn : dict.btnAudioOff;
    document.getElementById('preview-btn-text').textContent = this._embedVisible
      ? dict.btnHidePreview
      : dict.btnPlayPreview;
    this.updateGalaxyNavToggleAccessibility();
    this.updateImportModeUI();
    this.updateCurrentUniverseUI();
    this.renderUniverseArchive();
    this.renderCommunityProfiles();
    if (this.activeCommunityChatId) this.renderCommunityChat();
  }

  updateGalaxyNavToggleAccessibility() {
    const nav = document.getElementById('galaxy-nav');
    const button = document.getElementById('btn-toggle-galaxy-nav');
    if (!nav || !button) return;

    const collapsed = nav.classList.contains('collapsed');
    const dict = I18N[this.currentLang];
    button.setAttribute('aria-expanded', String(!collapsed));
    button.setAttribute('aria-label', collapsed ? dict.navShow : dict.navHide);
    button.title = collapsed ? dict.navShow : dict.navHide;
    button.querySelector('.toggle-icon').textContent = collapsed ? '▶' : '◀';
  }

  showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new MusicUniverseApp();
});

window.onSpotifyIframeApiReady = IFrameAPI => {
  window.spotifyIframeApi = IFrameAPI;
  if (window.app) window.app.setSpotifyIframeApi(IFrameAPI);
};
