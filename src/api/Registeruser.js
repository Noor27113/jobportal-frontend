import { BASE_URL } from '../config';

const registerUser = async (name, email, phone, password) => {
  // ─── Input Validation ──────────────────────────────────────
  if (!name || !email || !phone || !password) {
    console.warn('⚠️ Missing registration fields');
    return {
      success: false,
      message: 'All fields are required'
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim()
      })
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // ─── Error Handling ───────────────────────────────────────
    if (!response.ok) {
      console.error('❌ Registration failed:', data?.message || response.statusText);
      return {
        success: false,
        message: data?.message || 'Registration failed'
      };
    }

    // ─── Success ──────────────────────────────────────────────
    console.log('✅ Registration successful');
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
