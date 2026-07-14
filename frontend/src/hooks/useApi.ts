'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const get = useCallback(async <T>(url: string, params?: Record<string, any>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const res = await api.get(url, { params });
      const body = res.data;
      const items = body.data ?? body;
      setState({ data: items, loading: false, error: null });
      return items as T;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'An error occurred';
      setState({ data: null, loading: false, error: message });
      throw err;
    }
  }, []);

  const post = useCallback(async <T>(url: string, body: any) => {
    setState({ data: null, loading: true, error: null });
    try {
      const res = await api.post(url, body);
      const result = res.data.data ?? res.data;
      setState({ data: result, loading: false, error: null });
      return result as T;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'An error occurred';
      setState({ data: null, loading: false, error: message });
      throw err;
    }
  }, []);

  const put = useCallback(async <T>(url: string, body: any) => {
    setState({ data: null, loading: true, error: null });
    try {
      const res = await api.put(url, body);
      const result = res.data.data ?? res.data;
      setState({ data: result, loading: false, error: null });
      return result as T;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'An error occurred';
      setState({ data: null, loading: false, error: message });
      throw err;
    }
  }, []);

  const del = useCallback(async (url: string): Promise<void> => {
    setState({ data: null, loading: true, error: null });
    try {
      await api.delete(url);
      setState({ data: null, loading: false, error: null });
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'An error occurred';
      setState({ data: null, loading: false, error: message });
      throw err;
    }
  }, []);

  const upload = useCallback(async (file: File, folder?: string) => {
    setState({ data: null, loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (folder) formData.append('folder', folder);
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setState({ data: res.data.data, loading: false, error: null });
      return res.data.data;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Upload failed';
      setState({ data: null, loading: false, error: message });
      throw err;
    }
  }, []);

  return { ...state, get, post, put, del, upload, setState };
}
