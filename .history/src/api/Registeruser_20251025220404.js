
import axios from 'axios';

export const registerUser = async (formData) => {
  const res = await axios.post('http://localhost:5000/api/register', formData);
  return res.data;
};



const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Failed to register user' };
  }
};

export default registerUser;

