// src/api/verifyOtp.js
import axios from 'axios';

export const verifyOtp = async (email, otp) => {
  const res = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
  return res.data;
};
