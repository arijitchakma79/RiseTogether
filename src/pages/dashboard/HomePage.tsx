import React, { useEffect, useState } from 'react';
import {
  get_all_donation_request,
  fulfill_donation_request
} from '../../apis/donation_requests_api';
import {
  DonationFilter,
  DonationRequestCard,
  Pagination,
  SubmitRequestForm
} from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/dashboard/HomePage.css';

const ITEMS_PER_PAGE = 8;

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDates, setFilterDates] = useState({ from: '', to: '' });
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null); // for popup form

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [requests, filterCategory, filterDates, filterStatus]);

  const fetchRequests = async () => {
    try {
      const { data } = await get_all_donation_request('donation_requests');
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch donation requests:', error);
    }
  };

  const applyFilters = () => {
    let filteredData = [...requests];

    if (filterCategory) {
      filteredData = filteredData.filter(req => req.category === filterCategory);
    }

    if (filterDates.from && filterDates.to) {
      filteredData = filteredData.filter(req => {
        const createdAt = new Date(req.created_at);
        return createdAt >= new Date(filterDates.from) && createdAt <= new Date(filterDates.to);
      });
    }

    if (filterStatus) {
      filteredData = filteredData.filter(req => req.status === filterStatus);
    }

    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const handleFormSubmit = (formData: {
    name: string;
    contact_number: string;
    contact_email?: string;
    reason: string;
  }) => {
    console.log('User is interested in request:', selectedRequest);
    console.log('Form data submitted:', formData);
    setSelectedRequest(null); // close popup
  };

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="home-page-container">
      <DonationFilter
        category={filterCategory}
        onCategoryChange={setFilterCategory}
        dateRange={filterDates}
        onDateRangeChange={setFilterDates}
        status={filterStatus}
        onStatusChange={setFilterStatus}
      />

      <div className="request-grid">
        {paginated.length > 0 ? (
          paginated.map((req) => (
            <DonationRequestCard
              key={req.id}
              request={req}
              onRequest={() => setSelectedRequest(req)}
            />
          ))
        ) : (
          <p className="no-results">No donation requests found.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filtered.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {selectedRequest && (
        <SubmitRequestForm
          onClose={() => setSelectedRequest(null)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default HomePage;
