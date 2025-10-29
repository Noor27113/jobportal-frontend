import { API_BASE } from '../config';

const verifyOtp = async (email, otp) => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/verifyotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    });

    const result = await response.json();

    if (!response.ok) {
      console.warn('🔐 OTP verification failed:', result.message || 'Unknown error');
      return { success: false, message: result.message || 'OTP verification failed' };
    }

    return { success: true, ...result };
  } catch (error) {
    console.error('🌐 Network/server error during OTP verification:', error.message);
    return { success: false, message: 'Unable to connect to server' };
  }
};

export default verifyOtp;
