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
