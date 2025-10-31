// /src/api/loginUser.js

import { BASE_URL } from '../config';

const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim()
      })
    });

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      console.error('❌ loginUser failed:', data?.message || 'Login failed');
      return {
        success: false,
        message: data?.message || 'Login failed'
      };
    }

    return {
      success: true,
      ...data
    };
  } catch (err) {
    console.error('❌ loginUser error:', err.message);
    return {
      success: false,
      message: 'Unable to connect to server'
    };
  }
};

export default loginUser;
