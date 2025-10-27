import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import user from '../../assets/user.svg';
import { registerUser } from '../../api/RegisterUser'; // ✅ Named export
import verifyOtp from '../../api/verifyOtp'; // ✅ Default export

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Enter a valid email address';

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number';

    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const res = await registerUser(payload);
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
      <div className="register-container">
        <div className="illustration-section">
          <img src={user} alt="Registration Illustration" className="illustration-image" />
        </div>

        <div className="form-section">
          <h2 className="form-title">Registration Form</h2>
          <form onSubmit={handleSubmit}>
            {['name', 'email', 'phone', 'password', 'confirmPassword'].map((field) => (
              <div className="input-group" key={field}>
                <input
                  type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={
                    field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  className={errors[field] ? 'is-invalid' : ''}
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
