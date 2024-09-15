import axios from 'axios';

const url = 'https://auth-server-opal.vercel.app'; 
// const url = 'your hosted url'; // for production server

export const signup = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${url}/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to signup');
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${url}/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to login');
  }
};