const registerUser = async (name, email, phone, password) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      return { success: false, message: data?.message || 'Registration failed' };
    }

    return { success: true }; // ✅ No message needed
  } catch (err) {
    return { success: false, message: 'Unable to connect to server' };
  }
};

export default registerUser;
