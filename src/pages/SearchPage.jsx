import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserSearchResults from '../components/UserSearchResults';
import { searchUsers } from '../services/githubApi';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchPage, setSearchPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) {
        navigate('/');
        return;
      }

      setLoading(true);
      setError(null);
      setSearchPage(1);

      try {
        const data = await searchUsers(query, 1);
        setSearchResults(data.items);
        setTotalCount(data.total_count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query, navigate]);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      const nextPage = searchPage + 1;
      const data = await searchUsers(query, nextPage);
      setSearchResults(prev => [...prev, ...data.items]);
      setSearchPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-destructive">{error}</h3>
        <p className="text-muted-foreground mt-2">Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <UserSearchResults 
        users={searchResults} 
        totalCount={totalCount}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
      />
    </div>
  );
};

export default SearchPage;
