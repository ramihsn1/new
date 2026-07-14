'use client';

import AdminListPage from '@/components/admin/AdminListPage';

export default function AdminProjectsPage() {
  const columns = [
    { key: 'title', label: 'Project Name' },
    { key: 'status', label: 'Status' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
  ];

  return (
    <AdminListPage entityName="Projects" columns={columns} apiEndpoint="/projects" onCreateNew={() => {}} />
  );
}
