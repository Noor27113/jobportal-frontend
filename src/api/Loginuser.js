import { API_BASE } from './config';

const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('🔐 Login failed:', data.message || 'Unknown error');
      return { success: false, message: data.message || 'Login failed' };
    }

    return { success: true, ...data };
  } catch (err) {
    console.error('Network/server error during login:', err.message);
    return { success: false, message: 'Unable to connect to server' };
  }
};

export default loginUser;
