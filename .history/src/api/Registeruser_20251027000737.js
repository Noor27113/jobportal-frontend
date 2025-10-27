const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const registerUser = async (name, email, phone, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Failed to register user' };
  }
};

export default registerUser;
