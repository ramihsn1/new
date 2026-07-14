'use client';

import { useState, useEffect } from 'react';

interface AdminCRUDProps {
  entityName: string;
  apiEndpoint: string;
  fields: { name: string; label: string; type: string; required?: boolean }[];
  listColumns: { key: string; label: string }[];
}

export function useAdminCRUD(entityName: string, apiEndpoint: string) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<any>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  const fetchItems = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${API_URL}${apiEndpoint}/admin?page=${page}&limit=20`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (formData: any) => {
    const token = localStorage.getItem('auth_token');
    const url = editingItem
      ? `${API_URL}${apiEndpoint}/${editingItem._id}`
      : `${API_URL}${apiEndpoint}`;
    const method = editingItem ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      fetchItems(currentPage);
      setShowForm(false);
      setEditingItem(null);
    }
    return data;
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('auth_token');
    const res = await fetch(`${API_URL}${apiEndpoint}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      fetchItems(currentPage);
      setShowDeleteConfirm(null);
    }
  };

  return {
    items, loading, totalPages, currentPage,
    editingItem, setEditingItem,
    showForm, setShowForm,
    showDeleteConfirm, setShowDeleteConfirm,
    fetchItems, handleSave, handleDelete,
  };
}

export default function AdminListPage({
  entityName,
  columns,
  apiEndpoint,
  onCreateNew,
}: {
  entityName: string;
  columns: { key: string; label: string }[];
  apiEndpoint: string;
  onCreateNew: () => void;
}) {
  const {
    items, loading, totalPages, currentPage,
    showDeleteConfirm, setShowDeleteConfirm,
    fetchItems, handleDelete,
  } = useAdminCRUD(entityName, apiEndpoint);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary dark:text-white">{entityName}</h2>
          <p className="text-sm text-text-secondary dark:text-white/85">{items.length} items</p>
        </div>
        <button onClick={onCreateNew}
          className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
          + Add New
        </button>
      </div>

      {loading ? (
        <div className="card p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-primary">Loading...</p>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/5 dark:border-white/5">
                    {columns.map((col) => (
                      <th key={col.key} className="px-6 py-4 text-left text-xs font-semibold text-text-secondary dark:text-white/85 uppercase tracking-wider">{col.label}</th>
                    ))}
                    <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary dark:text-white/85 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 dark:divide-white/5">
                  {items.map((item: any) => (
                    <tr key={item._id} className="hover:bg-primary/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                      {columns.map((col) => (
                        <td key={col.key} className="px-6 py-4 text-sm text-primary dark:text-white">
                          {col.key === 'title' || col.key === 'name' ? (
                            <span className="font-medium text-primary dark:text-white">
                              {typeof item[col.key] === 'object' ? (item[col.key]?.en || '-') : (item[col.key] || '-')}
                            </span>
                          ) : col.key === 'status' ? (
                            <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-medium ${
                              item[col.key] === 'published' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                              item[col.key] === 'draft' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                              'bg-gray-50 dark:bg-gray-900/20 text-gray-500'
                            }`}>
                              {item[col.key] || '-'}
                            </span>
                          ) : (
                            <span>{item[col.key] || '-'}</span>
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => {
                            const event = new CustomEvent('edit-item', { detail: item });
                            window.dispatchEvent(event);
                          }} className="px-3 py-1.5 rounded-lg text-xs font-medium text-primary dark:text-white/95 hover:bg-primary/5 dark:hover:bg-white/5 transition-colors">
                            Edit
                          </button>
                          <button onClick={() => setShowDeleteConfirm(item)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => fetchItems(i + 1)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow' : 'bg-white dark:bg-surface-dark text-primary dark:text-white/95 hover:bg-primary/5'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)}>
          <div className="card p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-primary dark:text-white mb-2">Confirm Delete</h3>
            <p className="text-sm text-primary dark:text-white/95 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 rounded-xl text-sm font-medium text-primary hover:bg-primary/5 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(showDeleteConfirm._id)} className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
