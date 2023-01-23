import { useState, useEffect, useCallback } from 'react';

const useFetch = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    
    const fetchData = useCallback(async (url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
    }, []);
    
    return { fetchData, error, loading };
    };
export default useFetch;