'use client';

import AdminListPage from '@/components/admin/AdminListPage';

export default function AdminMediaPage() {
  const columns = [
    { key: 'originalName', label: 'File Name' },
    { key: 'mimeType', label: 'Type' },
    { key: 'folder', label: 'Folder' },
    { key: 'createdAt', label: 'Uploaded' },
  ];

  return (
    <AdminListPage entityName="Media" columns={columns} apiEndpoint="/media" onCreateNew={() => {}} />
  );
}
