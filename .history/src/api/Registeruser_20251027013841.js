const registerUser = async (name, email, phone, password) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.warn('Registration failed:', errorData.message || 'Unknown error');
      return { error: errorData.message || 'Registration failed' };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Network or server error during registration:', err.message);
    return { error: 'Unable to connect to server' };
  }
};

export default registerUser;
