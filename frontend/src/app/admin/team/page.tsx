'use client';

import AdminListPage from '@/components/admin/AdminListPage';

export default function AdminTeamPage() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'position.en', label: 'Position' },
    { key: 'email', label: 'Email' },
    { key: 'isActive', label: 'Active' },
  ];

  return (
    <AdminListPage entityName="Team Members" columns={columns} apiEndpoint="/team" onCreateNew={() => {}} />
  );
}
