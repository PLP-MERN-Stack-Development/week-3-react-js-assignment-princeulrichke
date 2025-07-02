/**
 * API service for fetching data from JSONPlaceholder
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Generic fetch wrapper with error handling
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} - Promise that resolves to response data
 */
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

/**
 * Get all posts with optional pagination
 * @param {number} page - Page number (starts from 1)
 * @param {number} limit - Number of posts per page
 * @returns {Promise} - Promise that resolves to posts array
 */
export const getPosts = async (page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  return fetchData(`${BASE_URL}/posts?_start=${start}&_limit=${limit}`);
};

/**
 * Get all posts (for search functionality)
 * @returns {Promise} - Promise that resolves to all posts
 */
export const getAllPosts = async () => {
  return fetchData(`${BASE_URL}/posts`);
};

/**
 * Get a single post by ID
 * @param {number} id - Post ID
 * @returns {Promise} - Promise that resolves to post object
 */
export const getPost = async (id) => {
  return fetchData(`${BASE_URL}/posts/${id}`);
};

/**
 * Get all users
 * @returns {Promise} - Promise that resolves to users array
 */
export const getUsers = async () => {
  return fetchData(`${BASE_URL}/users`);
};

/**
 * Get a single user by ID
 * @param {number} id - User ID
 * @returns {Promise} - Promise that resolves to user object
 */
export const getUser = async (id) => {
  return fetchData(`${BASE_URL}/users/${id}`);
};

/**
 * Get all albums
 * @returns {Promise} - Promise that resolves to albums array
 */
export const getAlbums = async () => {
  return fetchData(`${BASE_URL}/albums`);
};

/**
 * Get all photos with optional pagination
 * @param {number} page - Page number (starts from 1)
 * @param {number} limit - Number of photos per page
 * @returns {Promise} - Promise that resolves to photos array
 */
export const getPhotos = async (page = 1, limit = 20) => {
  const start = (page - 1) * limit;
  return fetchData(`${BASE_URL}/photos?_start=${start}&_limit=${limit}`);
};

/**
 * Get comments for a specific post
 * @param {number} postId - Post ID
 * @returns {Promise} - Promise that resolves to comments array
 */
export const getComments = async (postId) => {
  return fetchData(`${BASE_URL}/posts/${postId}/comments`);
};

/**
 * Search posts by title or body content
 * @param {string} query - Search query
 * @param {Array} posts - Array of posts to search through
 * @returns {Array} - Filtered posts array
 */
export const searchPosts = (query, posts) => {
  if (!query.trim()) return posts;
  
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.body.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  POSTS: `${BASE_URL}/posts`,
  USERS: `${BASE_URL}/users`,
  ALBUMS: `${BASE_URL}/albums`,
  PHOTOS: `${BASE_URL}/photos`,
  COMMENTS: `${BASE_URL}/comments`,
};
