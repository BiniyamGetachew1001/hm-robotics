import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useSupabaseCrud<T = any>(tableName: string) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from(tableName)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setItems(data as T[]);
        } catch (err: any) {
            console.error('Fetch error:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [tableName]);

    const createRecord = async (payload: Partial<T>) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.from(tableName).insert([payload]);
            if (error) throw error;
            await fetchData();
            return { success: true };
        } catch (err: any) {
            console.error('Create error:', err.message);
            setError(err.message);
            return { error: err.message, success: false };
        } finally {
            setLoading(false);
        }
    };

    const updateRecord = async (idField: keyof T, idValue: any, payload: Partial<T>) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.from(tableName).update(payload).eq(idField as string, idValue);
            if (error) throw error;
            await fetchData();
            return { success: true };
        } catch (err: any) {
            console.error('Update error:', err.message);
            setError(err.message);
            return { error: err.message, success: false };
        } finally {
            setLoading(false);
        }
    };

    const deleteRecord = async (idField: keyof T, idValue: any) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.from(tableName).delete().eq(idField as string, idValue);
            if (error) throw error;
            await fetchData();
            return { success: true };
        } catch (err: any) {
            console.error('Delete error:', err.message);
            setError(err.message);
            return { error: err.message, success: false };
        } finally {
            setLoading(false);
        }
    };

    return {
        items,
        loading,
        error,
        fetchData,
        createRecord,
        updateRecord,
        deleteRecord
    };
}
