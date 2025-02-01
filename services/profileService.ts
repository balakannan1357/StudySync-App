import api from './api'; // Import your Axios instance

// Fetch user profile data
export const fetchProfile = async () => {
  try {
    const response = await api.get('/profile'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile data');
  }
};