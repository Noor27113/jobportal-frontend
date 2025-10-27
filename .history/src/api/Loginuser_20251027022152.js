const loginUser = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.warn('Login failed:', errorData.message || 'Unknown error');
      return { error: errorData.message || 'Login failed' };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Network or server error during login:', err.message);
    return { error: 'Unable to connect to server' };
  }
};

export default loginUser;
