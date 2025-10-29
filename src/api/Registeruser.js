import { API_BASE } from '../config';

const registerUser = async (name, email, phone, password) => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/registeruser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, password })
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('Registration failed:', data.message || 'Unknown error');
      return { error: data.message || 'Registration failed' };
    }

    return data;
  } catch (err) {
    console.error('Network or server error during registration:', err.message);
    return { error: 'Unable to connect to server' };
  }
};

export default registerUser;
