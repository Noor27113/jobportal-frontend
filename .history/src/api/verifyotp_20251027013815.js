const verifyOtp = async (email, otp) => {
  try {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.warn('OTP verification failed:', errorData.message || 'Unknown error');
      return { error: errorData.message || 'OTP verification failed' };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Network or server error during OTP verification:', err.message);
    return { error: 'Unable to connect to server' };
  }
};

export default verifyOtp;
