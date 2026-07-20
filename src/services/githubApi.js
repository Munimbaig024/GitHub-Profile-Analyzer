const BASE_URL = '/api/github';

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    if (response.status === 403) {
      const resetTime = response.headers.get('x-ratelimit-reset');
      if (resetTime) {
        const date = new Date(resetTime * 1000);
        throw new Error(`API rate limit exceeded. Please try again after ${date.toLocaleTimeString()}`);
      }
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to fetch from GitHub');
  }
  return response.json();
};

export const fetchUserProfile = async (username) => {
  const response = await fetch(`${BASE_URL}?endpoint=users/${username}`);
  return handleResponse(response);
};

export const fetchUserRepos = async (username) => {
  // Fetch up to 100 repos, sorted by recently updated
  const response = await fetch(`${BASE_URL}?endpoint=users/${username}/repos&per_page=100&sort=updated`);
  return handleResponse(response);
};

export const searchUsers = async (query, page = 1) => {
  // Search for users, getting up to 12 results per page
  const response = await fetch(`${BASE_URL}?endpoint=search/users&q=${encodeURIComponent(query)}&per_page=12&page=${page}`);
  return handleResponse(response);
};

export const searchGlobalRepos = async (query, page = 1) => {
  // Search for repositories, getting up to 12 results per page
  const response = await fetch(`${BASE_URL}?endpoint=search/repositories&q=${encodeURIComponent(query)}&per_page=12&page=${page}`);
  return handleResponse(response);
};
