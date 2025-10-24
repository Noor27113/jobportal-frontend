

import axios from 'axios';

export const loginUser = async (email, password) => {
  const res = await axios.post('http://localhost:5000/api/login', { email, password });
  return res.data;
};
