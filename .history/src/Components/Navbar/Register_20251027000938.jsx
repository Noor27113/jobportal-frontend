import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registeruser from '../../api/registeruser';
import verify0tp from '../../api/verifyotp';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Invalid phone';
    if (formData.password.length < 6) newErrors.password = 'Password too short';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await registerUser(
        formData.name,
        formData.email,
        formData.phone,
        formData.password
      );
      if (res.message === 'OTP sent to email') {
        setShowOtpInput(true);
      } else {
        setErrorMsg(res.message || 'Registration failed');
      }
    } catch (err) {
      setErrorMsg('Server error during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setLoading(true);
    try {
      const res = await verifyOtp(formData.email, otp);
      if (res.message === 'Email verified successfully') {
        navigate('/login');
      } else {
        setErrorMsg(res.message || 'OTP verification failed');
      }
    } catch (err) {
      setErrorMsg('Server error during OTP verification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'phone', 'password', 'confirmPassword'].map((field) => (
          <div key={field}>
            <input
              type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
              className={errors[field] ? 'is-invalid' : ''}
            />
            {errors[field] && <div className="error">{errors[field]}</div>}
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'SUBMIT'}
        </button>
      </form>

      {showOtpInput && (
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          {errorMsg && <div className="error">{errorMsg}</div>}
          <button onClick={handleOtpVerify} disabled={loading}>
            {loading ? 'Verifying...' : 'VERIFY OTP'}
          </button>
        </div>
      )}
    </div>
  );
}
