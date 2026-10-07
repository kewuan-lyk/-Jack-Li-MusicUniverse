# Free AI chat setup

The community chat uses Groq's free API through the server-side function at `api/chat.js`. The API key never needs to be placed in `index.html` or browser storage.

## Recommended deployment: Vercel

1. Create a free GroqCloud account and generate an API key in the Groq console.
2. Import this project into Vercel.
3. In the Vercel project settings, add the environment variable `GROQ_API_KEY`.
4. Redeploy the project. The browser will automatically call `/api/chat`.

Optional environment variables:

- `GROQ_MODEL`: defaults to `openai/gpt-oss-120b`.
- `ALLOWED_ORIGIN`: set this to the exact production origin, such as `https://music-universe.example.com`, to reject calls from other sites.

## API contract

The browser sends a `POST /api/chat` request:

```json
{
  "persona": { "id": "rock" },
  "messages": [
    { "role": "user", "content": "What should I listen to tonight?" }
  ]
}
```

The function returns:

```json
{
  "reply": "Generated response",
  "model": "openai/gpt-oss-120b"
}
```

When the function or provider is unavailable, the existing browser-side fallback remains active.
