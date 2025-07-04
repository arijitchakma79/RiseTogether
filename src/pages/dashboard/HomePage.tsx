import React, { useEffect, useState, useCallback } from 'react';
import {
  get_all_donation_request,
  get_fulfilled_donation_requests,
  filter_donation_requests_by_title,
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
const SEARCH_DEBOUNCE_MS = 300;

// Define available categories
const CATEGORIES = [
  'Clothing',
  'Food',
  'Education',
  'Medical',
  'Shelter',
  'Other'
];

// Define sort options
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'urgent', label: 'Most Urgent' }
];

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDates, setFilterDates] = useState({ from: '', to: '' });
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    try {
      let data;
  
      if (user?.role === 'admin') {
        const response = await get_all_donation_request('donation_requests');
        data = response.data;
      } else {
        const response = await get_fulfilled_donation_requests('donation_requests');
        data = response.data;
      }
  
      setRequests(data);
      setFiltered(data);
    } catch (error) {
      console.error('Failed to fetch donation requests:', error);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setIsSearching(false);
        applyFilters();
        return;
      }

      setIsSearching(true);
      try {
        const response = await filter_donation_requests_by_title('donation_requests', query);
        let filteredData = response.data;

        // Apply other filters to the search results
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

        // Apply sorting
        filteredData.sort((a, b) => {
          switch (sortBy) {
            case 'newest':
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            case 'oldest':
              return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            case 'urgent':
              return (b.urgency || 0) - (a.urgency || 0);
            default:
              return 0;
          }
        });

        setFiltered(filteredData);
      } catch (error) {
        console.error('Error searching donations:', error);
      } finally {
        setIsSearching(false);
      }
    },
    [filterCategory, filterDates, filterStatus, sortBy]
  );

  // Handle search input changes with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  const applyFilters = useCallback(() => {
    if (searchQuery.trim()) {
      // If there's a search query, let the debouncedSearch handle filtering
      return;
    }

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

    // Apply sorting
    filteredData.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'urgent':
          return (b.urgency || 0) - (a.urgency || 0);
        default:
          return 0;
      }
    });

    setFiltered(filteredData);
    setCurrentPage(1);
  }, [requests, filterCategory, filterDates, filterStatus, sortBy, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFormSubmit = (formData: {
    name: string;
    contact_number: string;
    contact_email?: string;
    reason: string;
  }) => {
    console.log('User is interested in request:', selectedRequest);
    console.log('Form data submitted:', formData);
    setSelectedRequest(null);
  };

  const handleClearFilters = () => {
    setFilterCategory('');
    setFilterDates({ from: '', to: '' });
    setFilterStatus('');
    setSortBy('newest');
    setSearchQuery('');
  };

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="home-page-container">
      <div className="filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search donations by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`search-input ${isSearching ? 'searching' : ''}`}
            aria-label="Search donations by title"
          />
          {isSearching && <div className="search-spinner" />}
        </div>

        <div className="filter-controls">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
            aria-label="Sort donations"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {user?.role === 'admin' && (
            <DonationFilter
              category={filterCategory}
              onCategoryChange={setFilterCategory}
              dateRange={filterDates}
              onDateRangeChange={setFilterDates}
              status={filterStatus}
              onStatusChange={setFilterStatus}
            />
          )}

          <button 
            onClick={handleClearFilters}
            className="clear-filters-btn"
          >
            Clear Filters
          </button>
        </div>
      </div>

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
