import { API_BASE } from './Config';

const verifyOtp = async (email, otp) => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await response.json(); // ✅ only once

    if (!response.ok) {
      console.warn('OTP verification failed:', data.message || 'Unknown error');
      return { error: data.message || 'OTP verification failed' };
    }

    return data;
  } catch (err) {
    console.error('Network or server error during OTP verification:', err.message);
    return { error: 'Unable to connect to server' };
  }
};

export default verifyOtp;
