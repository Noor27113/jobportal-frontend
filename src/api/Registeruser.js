import axios from 'axios';
import { BASE_URL } from './config'; // Make sure config.js exports BASE_URL correctly

export default async function registerUser(name, email, phone, password) {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      name,
      email,
      phone,
      password
    });

    return response.data; // { success: true } or { success: false, message: '...' }
  } catch (error) {
    console.error('❌ Register API error:', error.message);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        'Registration failed. Please try again.'
    };
  }
}
