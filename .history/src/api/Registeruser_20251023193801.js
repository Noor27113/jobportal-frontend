
import axios from 'axios';

export const registerUser = async (formData) => {
  const res = await axios.post('http://localhost:5000/api/register', formData);
  return res.data;
};
