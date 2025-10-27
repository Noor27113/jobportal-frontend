const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registeruser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Failed to register user' };
  }
};
export default registeruser;
