import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Login.scss';
import useAuthStore from '../actions/authStore';

const Login = () => {

  const { Login } = useAuthStore;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Login(formData.email, formData.password);
      navigate('/verfiy-otp');
    } catch (error) {
      console.log(error);
    }

  };

  const handleForgotPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
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
        </div>
        <Link to="/verify-otp" type="submit" className="login-btn">Login</Link>
      </form>
      <div className="forgot-password">
        <a onClick={handleForgotPassword}>Forgot Password?</a>
      </div>
      <div className="signup-redirect">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
