import axios from 'axios';
import { BASE_URL } from './config'; // ✅ BASE_URL = 'https://jobportal-backend-production-de8e.up.railway.app'

export default async function registerUser(name, email, phone, password) {
  try {
    console.log('📡 BASE_URL at runtime:', BASE_URL); // ✅ Runtime check

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
