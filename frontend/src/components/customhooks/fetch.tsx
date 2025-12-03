import { useState, useCallback } from 'react';

type FetchOptions = RequestInit & { credentials?: RequestCredentials };

const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<unknown>(null);

    const fetchData = useCallback(async (url: string, options: FetchOptions = {}) => {
        setLoading(true);
        setError(null);
        try {
            // default to sending cookies/credentials for auth routes; caller can override
            const mergedOptions: FetchOptions = { credentials: 'include', ...options };
            const response = await fetch(url, mergedOptions as RequestInit);
            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, setData]);

    return { fetchData, loading, error, data };
};

export default useFetch;