const BASE_URL = 'https://api.github.com';

export const fetchUserProfile = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user profile');
  }
  
  return response.json();
};

export const fetchUserRepos = async (username) => {
  // Fetch up to 100 repos, sorted by recently updated
  const response = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  
  return response.json();
};

export const searchUsers = async (query) => {
  // Search for users, getting up to 12 results
  const response = await fetch(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=12`);
  
  if (!response.ok) {
    throw new Error('Failed to search users');
  }
  
  return response.json();
};
