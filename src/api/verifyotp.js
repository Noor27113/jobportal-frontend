// src/api/verifyotp.js

import { BASE_URL } from '../config';

const verifyOtp = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'OTP verification failed');
    }

    return await response.json();
  } catch (err) {
    console.error('❌ verifyOtp error:', err.message);
    throw err;
  }
};

export default verifyOtp;
