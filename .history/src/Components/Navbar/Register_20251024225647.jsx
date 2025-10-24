import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import user from '../../assets/user.svg';
import { registerUser } from '../../api/RegisterUser';
import { verifyOtp } from '../../api/verifyOtp';



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

  // ✅ Form validation
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

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit registration and trigger OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const res = await registerUser(formData);
        if (res.message === 'OTP sent to email') {
          setShowOtpInput(true);
        } else {
          setErrorMsg(res.message || 'Registration failed');
        }
      } catch (err) {
        setErrorMsg('Server error during registration');
      }
    }
  };

  // ✅ Verify OTP and redirect to login
  const handleOtpVerify = async () => {
    try {
      const res = await verifyOtp(formData.email, otp);
      if (res.message === 'Email verified successfully') {
        navigate('/login');
      } else {
        setErrorMsg(res.message || 'OTP verification failed');
      }
    } catch (err) {
      setErrorMsg('Server error during OTP verification');
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
            <button type="submit" className="submit-btn">SUBMIT</button>
          </form>

          {/* ✅ OTP Input Section */}
          {showOtpInput && (
            <div className="otp-section">
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
              />
              <button onClick={handleOtpVerify} className="submit-btn">VERIFY OTP</button>
              {errorMsg && <div className="error">{errorMsg}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
