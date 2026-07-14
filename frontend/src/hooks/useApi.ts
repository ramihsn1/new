'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/api';
import { ApiResponse, PaginatedResponse } from '@/types';

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

  const get = useCallback(async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    setState({ data: null, loading: true, error: null });
    try {
      const res = await api.get<ApiResponse<T> | PaginatedResponse<T>>(url, { params });
      const data = res.data as any;
      setState({ data: data.data ?? data, loading: false, error: null });
      return data.data ?? data;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'An error occurred';
      setState({ data: null, loading: false, error: message });
      throw err;
    }
  }, []);

  const post = useCallback(async <T>(url: string, body: any): Promise<T> => {
    setState({ data: null, loading: true, error: null });
    try {
      const res = await api.post<ApiResponse<T>>(url, body);
      setState({ data: res.data.data ?? res.data, loading: false, error: null });
      return res.data.data ?? res.data;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'An error occurred';
      setState({ data: null, loading: false, error: message });
      throw err;
    }
  }, []);

  const put = useCallback(async <T>(url: string, body: any): Promise<T> => {
    setState({ data: null, loading: true, error: null });
    try {
      const res = await api.put<ApiResponse<T>>(url, body);
      setState({ data: res.data.data ?? res.data, loading: false, error: null });
      return res.data.data ?? res.data;
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

  const upload = useCallback(async (file: File, folder?: string): Promise<any> => {
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
