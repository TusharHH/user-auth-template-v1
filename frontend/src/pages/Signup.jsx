import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../actions/authStore';

import './styles/SignUp.scss';

const SignUp = () => {

  const { SignUp } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      const hasMinLength = value.length >= 6;
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[^A-Za-z0-9]/.test(value);

      setPasswordStrength({
        minLength: hasMinLength,
        uppercase: hasUppercase,
        lowercase: hasLowercase,
        number: hasNumber,
        specialChar: hasSpecialChar
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData.fullName, formData.email, formData.password);
      await SignUp(formData.fullName, formData.email, formData.password);
      navigate('/verify-otp');
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="password-strength">
            <span>Password strength:</span>
            <span>Very Weak</span>
            <div className="strength-bars">
              <div className={passwordStrength.minLength ? 'filled' : ''}></div>
              <div className={passwordStrength.uppercase ? 'filled' : ''}></div>
              <div className={passwordStrength.lowercase ? 'filled' : ''}></div>
              <div className={passwordStrength.number ? 'filled' : ''}></div>
              <div className={passwordStrength.specialChar ? 'filled' : ''}></div>
            </div>
          </div>
          <ul className="password-criteria">
            <li className={passwordStrength.minLength ? 'valid' : ''}>
              At least 6 characters
            </li>
            <li className={passwordStrength.uppercase ? 'valid' : ''}>
              Contains uppercase letter
            </li>
            <li className={passwordStrength.lowercase ? 'valid' : ''}>
              Contains lowercase letter
            </li>
            <li className={passwordStrength.number ? 'valid' : ''}>
              Contains a number
            </li>
            <li className={passwordStrength.specialChar ? 'valid' : ''}>
              Contains special character
            </li>
          </ul>
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <div className="login-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
