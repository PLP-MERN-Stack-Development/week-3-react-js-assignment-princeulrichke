import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for API data fetching with loading and error states
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {boolean} immediate - Whether to fetch immediately on mount
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useApi = (apiFunction, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, dependencies);

  const refetch = useCallback((...args) => {
    return fetchData(...args);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

/**
 * Custom hook for paginated API data
 * @param {Function} apiFunction - The API function to call (should accept page and limit)
 * @param {number} initialPage - Initial page number
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Object} - Pagination object with data and controls
 */
export const usePagination = (apiFunction, initialPage = 1, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, refetch } = useApi(
    () => apiFunction(currentPage, itemsPerPage),
    [currentPage]
  );

  useEffect(() => {
    if (data) {
      if (currentPage === 1) {
        setAllData(data);
      } else {
        setAllData(prev => [...prev, ...data]);
      }
      setHasMore(data.length === itemsPerPage);
    }
  }, [data, currentPage, itemsPerPage]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    setCurrentPage(1);
    setAllData([]);
    setHasMore(true);
  }, []);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
    setAllData([]);
  }, []);

  return {
    data: allData,
    currentData: data,
    loading,
    error,
    currentPage,
    hasMore,
    loadMore,
    reset,
    goToPage,
    refetch,
  };
};

/**
 * Custom hook for search functionality
 * @param {Array} data - Data to search through
 * @param {Function} searchFunction - Function to filter data
 * @param {number} debounceMs - Debounce delay in milliseconds
 * @returns {Object} - Search object with query and results
 */
export const useSearch = (data, searchFunction, debounceMs = 300) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState(data || []);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Update results when data or query changes
  useEffect(() => {
    if (data) {
      const filtered = searchFunction(debouncedQuery, data);
      setResults(filtered);
    }
  }, [data, debouncedQuery, searchFunction]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    query,
    setQuery,
    results,
    clearSearch,
    isSearching: query !== debouncedQuery,
  };
};
