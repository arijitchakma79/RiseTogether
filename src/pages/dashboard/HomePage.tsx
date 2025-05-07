import React, { useEffect, useState } from 'react';
import { get_all_donation_request } from '../../apis/donation_requests_api';
import { DonationFilter, DonationRequestCard, Pagination } from '../../components';
import '../../styles/dashboard/HomePage.css';

const ITEMS_PER_PAGE = 10;

const HomePage: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await get_all_donation_request('donation_requests');
      setRequests(data);
      setFiltered(data);
    } catch (error) {
      console.error("Failed to fetch donation requests:", error);
    }
  };

  const handleFilter = (category: string) => {
    if (!category) {
      setFiltered(requests);
    } else {
      setFiltered(requests.filter((req) => req.category === category));
    }
    setCurrentPage(1);
  };

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="home-page-container">
      <DonationFilter onFilter={handleFilter} />
      <div className="request-grid">
        {paginated.length > 0 ? (
          paginated.map((req) => (
            <DonationRequestCard key={req.id} request={req} />
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
