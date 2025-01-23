import axios from 'axios';

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post('/api/v1/auth/refresh', { refreshToken });

    // Save the new access token
    localStorage.setItem('userInfo', response.data.newAccessToken);

    return response.data.newAccessToken; // Return the new token for immediate use if needed
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; // Rethrow to allow further handling
  }
};
