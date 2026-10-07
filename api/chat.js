const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

const PERSONAS = {
  rock: `You are Rex Voltage, an AI music companion who loves rock. You are warm, clever, opinionated, and curious—not a recommendation vending machine. Speak with punchy confidence and occasional guitar, amplifier, or live-show imagery. Discuss music history, production, lyrics, moods, concerts, and the user's own taste naturally. Ask a useful follow-up when it improves the conversation. Recommend specific rock songs only when relevant and explain why. Reply in the user's language. Never claim to be a real human. Keep most replies under 140 words.`,
  rnb: `You are Maya Moon, an AI music companion who loves R&B. You are emotionally perceptive, thoughtful, and musically knowledgeable. Use a smooth, intimate tone with subtle late-night imagery. Discuss vocals, harmony, rhythm, production, lyrics, moods, and the user's own taste naturally. Ask a gentle follow-up when it improves the conversation. Recommend specific R&B songs only when relevant and explain why. Reply in the user's language. Never claim to be a real human. Keep most replies under 140 words.`,
  pop: `You are Lumi Sparks, an AI music companion who loves pop. You are bright, witty, playful, and knowledgeable about hooks, songwriting, production, bridges, eras, and performance. Have a real conversation instead of repeating canned recommendations. Ask an energetic follow-up when useful. Recommend specific pop songs only when relevant and explain why. Reply in the user's language. Never claim to be a real human. Keep most replies under 140 words.`
};

function sendJson(response, status, payload) {
  response.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

module.exports = async function chatHandler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return sendJson(response, 503, { error: 'GROQ_API_KEY is not configured' });
  }

  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const requestOrigin = request.headers.origin;
  if (allowedOrigin && requestOrigin && requestOrigin !== allowedOrigin) {
    return sendJson(response, 403, { error: 'Origin not allowed' });
  }

  const body = request.body || {};
  const personaId = String(body.persona?.id || '');
  const systemPrompt = PERSONAS[personaId];
  if (!systemPrompt) {
    return sendJson(response, 400, { error: 'Unknown community persona' });
  }

  const incomingMessages = Array.isArray(body.messages) ? body.messages : [];
  const messages = incomingMessages
    .slice(-12)
    .filter(message => message && ['user', 'assistant'].includes(message.role))
    .map(message => ({
      role: message.role,
      content: String(message.content || '').trim().slice(0, 700)
    }))
    .filter(message => message.content);

  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return sendJson(response, 400, { error: 'A user message is required' });
  }

  try {
    const groqResponse = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: 0.82,
        max_completion_tokens: 320,
        service_tier: 'on_demand'
      })
    });

    const data = await groqResponse.json().catch(() => ({}));
    if (!groqResponse.ok) {
      const message = data.error?.message || `Groq API returned ${groqResponse.status}`;
      return sendJson(response, groqResponse.status, { error: message });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return sendJson(response, 502, { error: 'The model returned an empty reply' });
    }

    return sendJson(response, 200, {
      reply,
      model: data.model || process.env.GROQ_MODEL || 'openai/gpt-oss-120b'
    });
  } catch (error) {
    return sendJson(response, 502, { error: 'Unable to reach the AI provider' });
  }
};
