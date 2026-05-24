const API_PORT = 8000;
const API_HOST_FALLBACK = `http://localhost:${API_PORT}`;

export function getCodespaceName() {
  const value = import.meta.env.VITE_CODESPACE_NAME;
  return typeof value === 'string' ? value.trim() : '';
}

export function hasCodespaceName() {
  return getCodespaceName().length > 0;
}

export function getApiHost() {
  const codespaceName = getCodespaceName();
  if (codespaceName) {
    return `https://${codespaceName}-${API_PORT}.app.github.dev`;
  }

  return API_HOST_FALLBACK;
}

export function getApiBaseUrl() {
  return `${getApiHost()}/api`;
}

export function getResourceUrl(resource) {
  return `${getApiBaseUrl()}/${resource}/`;
}

export function normalizeCollectionPayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidates = [payload.results, payload.items, payload.data];
  const collection = candidates.find(Array.isArray);
  return collection ?? [];
}

export function extractPagination(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return null;
  }

  const count = typeof payload.count === 'number' ? payload.count : null;
  const next = typeof payload.next === 'string' ? payload.next : null;
  const previous = typeof payload.previous === 'string' ? payload.previous : null;

  if (count === null && next === null && previous === null) {
    return null;
  }

  return { count, next, previous };
}
