'use client';

import AdminListPage from '@/components/admin/AdminListPage';

export default function AdminPublicationsPage() {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'downloadCount', label: 'Downloads' },
  ];

  return (
    <AdminListPage entityName="Publications" columns={columns} apiEndpoint="/publications" onCreateNew={() => {}} />
  );
}
