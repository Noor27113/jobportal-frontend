// src/api/Registeruser.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const registerUser = async (email, password) => {
  const endpoint = `${BASE_URL}/api/auth/register`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    // Parse and return successful response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('🔴 Registration error:', error.message);
    return { error: error.message || 'Failed to register user' };
  }
};

export default registerUser;
