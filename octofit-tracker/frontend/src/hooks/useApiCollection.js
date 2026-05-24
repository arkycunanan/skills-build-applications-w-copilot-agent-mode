import { useEffect, useMemo, useState } from 'react';
import {
  extractPagination,
  getResourceUrl,
  normalizeCollectionPayload,
} from '../lib/api';

export function useApiCollection(resource) {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = useMemo(() => getResourceUrl(resource), [resource]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(endpoint, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeCollectionPayload(payload));
        setPagination(extractPagination(payload));
      } catch (caughtError) {
        if (caughtError.name !== 'AbortError') {
          setError(caughtError.message || 'Unable to load data.');
          setItems([]);
          setPagination(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();

    return () => abortController.abort();
  }, [endpoint]);

  return { endpoint, items, pagination, isLoading, error };
}
