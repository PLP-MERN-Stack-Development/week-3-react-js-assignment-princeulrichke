import React, { useState, useEffect } from 'react';
import { getAllPosts, getUsers, searchPosts } from '../api/jsonPlaceholder';
import { useApi, usePagination, useSearch } from '../hooks/useApi';
import Button from './Button';
import Card from './Card';

/**
 * Loading spinner component
 */
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

/**
 * Error message component
 */
const ErrorMessage = ({ message, onRetry }) => (
  <Card className="text-center py-8">
    <div className="text-red-500 dark:text-red-400">
      <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <p className="text-lg font-medium mb-2">Oops! Something went wrong</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  </Card>
);

/**
 * Post card component
 */
const PostCard = ({ post, user, onClick }) => (
  <Card 
    hover 
    onClick={onClick}
    className="h-full"
  >
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {post.title}
        </h3>
        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full flex-shrink-0">
          #{post.id}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
        {post.body}
      </p>
      
      {user && (
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>{user.name}</span>
          <span className="mx-2">•</span>
          <span>{user.email}</span>
        </div>
      )}
    </div>
  </Card>
);

/**
 * Post detail modal
 */
const PostDetailModal = ({ post, user, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-4">
              {post.title}
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="p-2 flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
          
          {user && (
            <div className="flex items-center mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                {user.company && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.company.name}</p>
                )}
              </div>
            </div>
          )}
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.body}
            </p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button variant="primary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * API Data component that displays data from JSONPlaceholder API
 */
const ApiDataComponent = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [displayMode, setDisplayMode] = useState('grid'); // 'grid' or 'list'
  
  // Fetch all posts and users
  const { data: allPosts, loading: postsLoading, error: postsError, refetch: refetchPosts } = useApi(getAllPosts);
  const { data: users, loading: usersLoading, error: usersError } = useApi(getUsers);
  
  // Search functionality
  const { query, setQuery, results: searchResults, clearSearch, isSearching } = useSearch(
    allPosts,
    searchPosts,
    300
  );

  // Create user lookup map
  const userMap = users ? users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {}) : {};

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const loading = postsLoading || usersLoading;
  const error = postsError || usersError;
  const posts = query ? searchResults : allPosts || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            API Data Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore posts from JSONPlaceholder API with search and filtering capabilities
          </p>
        </div>
      </Card>

      {/* Search and Controls */}
      <Card>
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search posts by title or content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isSearching ? 'Searching...' : `${posts.length} posts found`}
                {query && !isSearching && (
                  <span className="ml-1">for "{query}"</span>
                )}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
              <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                <button
                  onClick={() => setDisplayMode('grid')}
                  className={`px-3 py-1 text-sm ${
                    displayMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setDisplayMode('list')}
                  className={`px-3 py-1 text-sm ${
                    displayMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  List
                </button>
              </div>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={refetchPosts}
                disabled={loading}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Content */}
      {loading && <LoadingSpinner />}
      
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={refetchPosts}
        />
      )}

      {!loading && !error && posts.length === 0 && query && (
        <Card className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <p className="text-lg font-medium">No posts found</p>
            <p className="text-sm mt-2">Try searching with different keywords</p>
          </div>
        </Card>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className={
          displayMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {posts.map((post) => (
            <div
              key={post.id}
              className={displayMode === 'list' ? 'w-full' : ''}
            >
              <PostCard
                post={post}
                user={userMap[post.userId]}
                onClick={() => handlePostClick(post)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          user={userMap[selectedPost.userId]}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ApiDataComponent;
