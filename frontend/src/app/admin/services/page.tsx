'use client';

import AdminListPage from '@/components/admin/AdminListPage';

export default function AdminServicesPage() {
  const columns = [
    { key: 'title', label: 'Service Name' },
    { key: 'category.en', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'sortOrder', label: 'Order' },
  ];

  return (
    <AdminListPage entityName="Services" columns={columns} apiEndpoint="/services" onCreateNew={() => {}} />
  );
}
