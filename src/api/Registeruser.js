// /src/api/registerUser.js

import { BASE_URL } from '../config';

const registerUser = async (name, email, phone, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim()
      })
    });

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || 'Registration failed'
      };
    }

    return {
      success: true
    };
  } catch (err) {
    console.error('❌ registerUser error:', err.message);
    return {
      success: false,
      message: 'Unable to connect to server'
    };
  }
};

export default registerUser;
