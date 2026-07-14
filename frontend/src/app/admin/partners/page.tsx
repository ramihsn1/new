'use client';

import AdminListPage from '@/components/admin/AdminListPage';

export default function AdminPartnersPage() {
  const columns = [
    { key: 'name', label: 'Partner Name' },
    { key: 'category', label: 'Category' },
    { key: 'website', label: 'Website' },
    { key: 'isActive', label: 'Active' },
  ];

  return (
    <AdminListPage entityName="Partners" columns={columns} apiEndpoint="/partners" onCreateNew={() => {}} />
  );
}
