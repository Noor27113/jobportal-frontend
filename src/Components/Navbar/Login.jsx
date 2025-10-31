import React, { useState } from 'react';
import './Login.css';
import loginIllustration from '../../assets/login.svg';
import loginUser from '../../api/Loginuser';


export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim()
    }));
    setError('');
    setSuccessMsg('');
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Enter a valid email address';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const res = await loginUser(formData.email, formData.password);
    setLoading(false);

    if (res.success) {
      setError('');
      setSuccessMsg('✅ Logged in successfully');
    } else {
      setSuccessMsg('');
      setError(res.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-illustration-section">
          <img src={loginIllustration} alt="Login Illustration" className="login-illustration" />
        </div>

        <div className="login-form-section">
          <h2 className="login-title">Sign In</h2>
          <form onSubmit={handleLogin}>
            <div className="login-input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="login-input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            {error && <div className="login-error">{error}</div>}
            {successMsg && <div className="login-success">{successMsg}</div>}

            <div className="login-links">
              <a href="#" className="login-link">Forgot Password?</a>
              <a href="/register" className="login-link">Register now</a>
            </div>

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
