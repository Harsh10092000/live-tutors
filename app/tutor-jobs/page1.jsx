'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import RequestCard from '@/components/search-listing/RequestCard';
import Filters from '@/components/search-listing/Filters';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SearchListing = ({ data, recordsPerPage, currentPage }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [requests, setRequests] = useState(data || []);
  const [displayedRequests, setDisplayedRequests] = useState(data || []);
  const [pagination, setPagination] = useState({
    total: data?.length || 0,
    totalPages: Math.ceil((data?.length || 0) / recordsPerPage),
    currentPage: parseInt(currentPage) || 1,
    perPage: recordsPerPage || 10
  });
  const [sortBy, setSortBy] = useState('latest');
  const [filters, setFilters] = useState({
    tutoring_type: '',
    query: '',
    student_level: '',
    gender: '',
    budget_min: '',
    budget_max: '',
    location: '',
    language: '',
    time_preference_type: '',
    time_preference: '',
    subjects: []
  });
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, data]);

  const applyFiltersAndSort = () => {
    let filtered = [...data];

    // Apply search query
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase();
      filtered = filtered.filter(request => 
        request.title?.toLowerCase().includes(searchTerm) ||
        request.description?.toLowerCase().includes(searchTerm) ||
        request.subjects?.toLowerCase().includes(searchTerm)
      );
    }

          // Apply filters
     filtered = filtered.filter(request => {
       // Handle multiple tutoring types
       if (filters.tutoring_type && filters.tutoring_type.length > 0) {
         const selectedTypes = filters.tutoring_type.split(',');
         const requestTypes = request.tutoring_type ? request.tutoring_type.split(',') : [];
         // Check if any of the selected types match with request types
         if (!selectedTypes.some(type => requestTypes.includes(type))) return false;
       }
       
       if (filters.student_level && request.student_level !== filters.student_level) return false;
       if (filters.gender && request.gender_preference !== filters.gender) return false;
       
       // Handle multiple languages
       if (filters.language && filters.language.length > 0) {
         const selectedLanguages = filters.language.split(',');
         const requestLanguages = request.languages ? request.languages.split(',') : [];
         // Check if any of the selected languages match with request languages
         if (!selectedLanguages.some(lang => requestLanguages.includes(lang))) return false;
       }
      if (filters.time_preference_type) {
        if (request.time_preference_type !== filters.time_preference_type) return false;
        if (filters.time_preference_type === 'fixed' && 
            filters.time_preference && 
            request.time_preference !== filters.time_preference) return false;
      }
      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'budget_low':
          return (parseFloat(a.budget) || 0) - (parseFloat(b.budget) || 0);
        case 'budget_high':
          return (parseFloat(b.budget) || 0) - (parseFloat(a.budget) || 0);
        case 'latest':
        default:
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
    });

    // Update pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.perPage);
    const start = (pagination.currentPage - 1) * pagination.perPage;
    const end = start + pagination.perPage;

    setRequests(filtered);
    setDisplayedRequests((filtered || []).slice(start, end));
    setPagination(prev => ({
      ...prev,
      total,
      totalPages
    }));
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [name]: value
      };

      // Reset time preference if type changes
      if (name === 'time_preference_type' && value !== 'fixed') {
        newFilters.time_preference = '';
      }

      return newFilters;
    });

    // Update active filters
    if (value && name !== 'query') {
      let filterLabel;
      if (typeof value === 'boolean') {
        if (value) {
          filterLabel = name.replace('_', ' ');
        }
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          filterLabel = `${name.replace('_', ' ')}: ${value.join(', ')}`;
        }
      } else {
        filterLabel = `${name.replace('_', ' ')}: ${value}`;
      }
      if (filterLabel) {
        setActiveFilters(prev => [...prev.filter(f => !f.startsWith(name)), filterLabel]);
      }
    } else if (name !== 'query') {
      setActiveFilters(prev => prev.filter(f => !f.startsWith(name)));
    }
  };

  const removeFilter = (filterToRemove) => {
    const name = filterToRemove.includes(':') 
      ? filterToRemove.split(':')[0].trim()
      : filterToRemove;

    setFilters(prev => {
      const newFilters = { ...prev };
      if (Array.isArray(newFilters[name])) {
        newFilters[name] = [];
      } else if (typeof newFilters[name] === 'boolean') {
        newFilters[name] = false;
      } else {
        newFilters[name] = '';
      }
      return newFilters;
    });

    setActiveFilters(prev => prev.filter(f => f !== filterToRemove));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
    
    const start = (page - 1) * pagination.perPage;
    const end = start + pagination.perPage;
    setDisplayedRequests(requests.slice(start, end));
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  return (
    <main className="tu-bgmain tu-main">
      <section className="tu-main-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tu-listing-wrapper">
                {/* Sort and View Options */}
                <div className="tu-sort">
                  <h3>
                    {pagination.total} Search result
                    {filters.query && (
                      <> in <span>"{filters.query}"</span></>
                    )} requests
                  </h3>
                  <div className="tu-sort-right-area">
                    <div className="tu-sortby">
                      <span>Sort by: </span>
                      <div className="tu-select">
                        <select 
                          className="form-control"
                          value={sortBy}
                          onChange={(e) => handleSort(e.target.value)}
                        >
                          <option value="latest">Latest first</option>
                          <option value="budget_low">Budget low to high</option>
                          <option value="budget_high">Budget high to low</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="tu-searchbar-wrapper">
                  <div className="tu-appendinput">
                    <div className="tu-searcbar">
                      <div className="tu-inputicon">
                        <a href="javascript:void(0);">
                          <i className="icon icon-search"></i>
                        </a>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="What do you want to explore?"
                          value={filters.query}
                          onChange={(e) => handleFilterChange('query', e.target.value)}
                        />
                      </div>
                      <a 
                        href="javascript:void(0);" 
                        className="tu-primbtn-lg tu-primbtn-orange"
                        onClick={() => applyFiltersAndSort()}
                      >
                        Search now
                      </a>
                    </div>
                  </div>
                  <div className="tu-listing-search">
                    <figure>
                      <img src="/images/listing/shape.png" alt="Start from here" />
                    </figure>
                    <span>Start from here</span>
                  </div>
                </div>

                {/* Active Filters */}
                {/* {activeFilters.length > 0 && (
                  <ul className="tu-searchtags">
                    {activeFilters.map((filter, index) => (
                      <li key={index}>
                        <span>
                          {filter}
                          <button onClick={() => removeFilter(filter)}>
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )} */}
              </div>
            </div>

            {/* Sidebar Filters */}
            <div className="col-xl-4 col-xxl-3">
              <Filters 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Requests List */}
            <div className="col-xl-8 col-xxl-9">
              <div className="tu-tutors-list">
                {displayedRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
                {displayedRequests.length === 0 && (
                  <div className="tu-no-results">
                    <h3>No requests found matching your criteria</h3>
                    <p>Try adjusting your filters or search terms</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <nav className="tu-pagination">
                  <ul>
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <li key={page} className={page === pagination.currentPage ? 'active' : ''}>
                        <a href="javascript:void(0);" onClick={() => handlePageChange(page)}>
                          {page}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchListing;