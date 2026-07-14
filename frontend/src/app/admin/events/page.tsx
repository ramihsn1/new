'use client';

import AdminListPage from '@/components/admin/AdminListPage';

export default function AdminEventsPage() {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'startDate', label: 'Date' },
    { key: 'location.en', label: 'Location' },
    { key: 'eventStatus', label: 'Status' },
  ];

  const formFields = [
    { name: 'title.en', label: 'Title (EN)', type: 'text', required: true },
    { name: 'location.en', label: 'Location', type: 'text' },
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
  ];

  return (
    <AdminListPage entityName="Events" columns={columns} apiEndpoint="/events" onCreateNew={() => {}} />
  );
}
