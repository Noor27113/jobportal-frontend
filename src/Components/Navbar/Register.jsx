import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import user from '../../assets/user.svg';
import registerUser from '../../api/Registeruser';

import verifyOtp from '../../api/verifyotp';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      navigate('/login'); // ✅ Redirect after OTP success
    }
  }, [success, navigate]);

  const validateForm = () => {
    const newErrors = {};
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(phone)) newErrors.phone = 'Invalid phone number';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const res = await registerUser(
      formData.name,
      formData.email,
      formData.phone,
      formData.password
    );

    setLoading(false);

    if (res.success) {
      setShowOtpInput(true); // ✅ Show OTP input
    } else {
      setErrorMsg(res.message); // ✅ Show backend error like "Email already registered"
    }
  };

  const handleOtpVerify = async () => {
    if (!otp.trim()) {
      setErrorMsg('OTP is required');
      return;
    }

    setLoading(true);
    const res = await verifyOtp(formData.email, otp);
    setLoading(false);

    if (res.success) {
      setErrorMsg('');
      setSuccess(true); // ✅ triggers redirect via useEffect
    } else {
      setErrorMsg(res.message || 'OTP verification failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="illustration-section">
          <img src={user} alt="Registration Illustration" className="illustration-image" />
        </div>

        <div className="form-section">
          <h2 className="form-title">Registration Form</h2>
          <form onSubmit={handleSubmit}>
            {['name', 'email', 'phone', 'password', 'confirmPassword'].map(field => (
              <div className="input-group" key={field}>
                <input
                  type={
                    field.includes('password') ? 'password' :
                    field === 'email' ? 'email' : 'text'
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={
                    field === 'confirmPassword' ? 'Confirm Password' :
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  className={errors[field] ? 'is-invalid' : ''}
                  autoComplete="off"
                />
                {errors[field] && <div className="error">{errors[field]}</div>}
              </div>
            ))}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'SUBMIT'}
            </button>
          </form>

          {showOtpInput && (
            <div className="otp-section">
              <label htmlFor="otp">Enter OTP:</label>
              <div className="input-group">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit OTP"
                  disabled={loading}
                  className={errorMsg ? 'is-invalid' : ''}
                />
                {errorMsg && <div className="error">{errorMsg}</div>}
              </div>
              <button onClick={handleOtpVerify} className="submit-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'VERIFY OTP'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
