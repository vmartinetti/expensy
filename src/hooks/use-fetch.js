import { useState, useCallback } from 'react';
import { API_URL } from '../config';
const useFetch = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    
    const fetchData = useCallback(async (query) => {
    try {
        const response = await fetch(API_URL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query)
        });
        const json = await response.json();
        return json.data;
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
    }, []);
    
    return { fetchData, error, loading };
    };
export default useFetch;