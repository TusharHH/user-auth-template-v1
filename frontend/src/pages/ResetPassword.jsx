// ResetPassword.js
import { useState } from 'react';
import './styles/Reset.scss'
import useAuthStore from '../actions/authStore';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const { ResetPassword } = useAuthStore();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await ResetPassword(email, otp, password);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="reset-password-container">
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <h2>Reset Your Password</h2>

                <div className="input-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="input-group">
                    <label>OTP</label>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={isSubmitting} className="reset-password-btn">
                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
