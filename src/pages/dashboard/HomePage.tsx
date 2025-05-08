import React, { useEffect, useState } from 'react';
import {
  get_all_donation_request,
  fulfill_donation_request
} from '../../apis/donation_requests_api';
import { DonationFilter, DonationRequestCard, Pagination } from '../../components';
import { useAuth } from '../../contexts/AuthContext'; 
import '../../styles/dashboard/HomePage.css';

const ITEMS_PER_PAGE = 8;

const HomePage: React.FC = () => {
  const { user } = useAuth(); // ✅ Get current user ID
  const [requests, setRequests] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDates, setFilterDates] = useState({ from: '', to: '' });

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [requests, filterCategory, filterDates]);

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

    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const handleFulfill = async (id: string) => {
    try {
      if (!user?.uid) {
        alert("You must be logged in to fulfill a request.");
        return;
      }

      await fulfill_donation_request('donation_requests', parseInt(id), user.uid);
      await fetchRequests(); // Refresh data after update
    } catch (error) {
      console.error('Failed to fulfill request:', error);
    }
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
      />
      <div className="request-grid">
        {paginated.length > 0 ? (
          paginated.map((req) => (
            <DonationRequestCard key={req.id} request={req} onFulfill={handleFulfill} />
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
    </div>
  );
};

export default HomePage;
