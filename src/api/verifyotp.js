// /src/api/verifyOtp.js
import { BASE_URL } from '../config';

const BASE_URL = 'https://jobportal-backend-production-de8e.up.railway.app'; // Replace with your actual Railway backend URL

const verifyOtp = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.trim(),
        otp: otp.trim()
      })
    });

    const contentType = response.headers.get('content-type');
    const result = contentType?.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      console.warn('❌ OTP verification failed:', result?.message || 'Unknown error');
      return {
        success: false,
        message: result?.message || 'OTP verification failed'
      };
    }

    return {
      success: true,
      ...result
    };
  } catch (error) {
    console.error('❌ Network or server error during OTP verification:', error.message);
    return {
      success: false,
      message: 'Unable to connect to server'
    };
  }
};

export default verifyOtp;
