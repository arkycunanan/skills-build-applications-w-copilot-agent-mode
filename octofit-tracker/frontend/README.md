# OctoFit Tracker Frontend

This presentation tier is built with React 19 and `react-router-dom`.

## Environment variable

Define `VITE_CODESPACE_NAME` so API requests target the public Codespaces backend URL:

```bash
# .env.local
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, component routes call:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This fallback avoids broken URLs such as `https://undefined-8000.app.github.dev`.

## Scripts

- `npm run dev` starts Vite.
- `npm run build` creates the production build.
