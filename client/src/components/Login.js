import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [agreeToTnC, setAgreeToTnC] = useState(false); // New state for checkbox

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreeToTnC) {
            setMessage('You must agree to the Terms and Conditions.');
            return;
        }

        try {
            const response = await api.post('/auth/login', { email, password }, { withCredentials: true });

            if (response.status === 200) {
                // Login is successful. Redirect to user dashboard
                navigate('/user/dashboard');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Login Failed. Please check your email and/or password, then try again.');
            }
        }
    };

    return (
        <div>
            <div>
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className="login-wrapper">
                            <div className="login-content">
                                <div className="login-userset">
                                    <div className="login-logo">
                                        <img src="/assets/img/logo.png" alt="img" />
                                    </div>
                                    <div className="login-userheading">
                                        <h3>Sign In</h3>
                                        <h4>Please login to your account</h4>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-login">
                                            <p className="text-danger">{message}</p>
                                        </div>
                                        <div className="form-login">
                                            <label>Email</label>
                                            <div className="form-addons">
                                                <input 
                                                    type="text" 
                                                    placeholder="Enter your email address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required 
                                                />
                                                <img src="/assets/img/icons/mail.svg" alt="img" />
                                            </div>
                                        </div>
                                        <div className="form-login">
                                            <label>Password</label>
                                            <div className="pass-group">
                                                <input 
                                                    type="password" 
                                                    className="pass-input" 
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required 
                                                />
                                                <span className="fas toggle-password fa-eye-slash"></span>
                                            </div>
                                        </div>
                                        <div className="form-login">
                                            <div className="alreadyuser">
                                                <h4><a href="forgetpassword.html" className="hover-a">Forgot Password?</a></h4>
                                            </div>
                                        </div>
                                        <div className="">
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    checked={agreeToTnC} 
                                                    onChange={(e) => setAgreeToTnC(e.target.checked)} 
                                                />
                                                I agree to the <a href="/terms-and-conditions" className="hover-a">Terms and Conditions</a>. 
                                                Also, read our  <a href="/privacy-policy" className="hover-a">Privacy Policy</a>

                                            </label>
                                        </div>
                                        <div className="form-login">
                                            <button 
                                                type="submit" 
                                                className="btn btn-login" 
                                                disabled={!agreeToTnC} // Disable button if not checked
                                            >
                                                Login
                                            </button>
                                        </div>
                                        <div className="signinform text-center">
                                            <h4>Don’t have an account? <a href="/register" className="hover-a">Register Here</a></h4>
                                        </div>
                                        <div className="form-setlogin">
                                            <h4>Or sign up with</h4>
                                        </div>
                                        <div className="form-sociallink">
                                            <ul>
                                                <li>
                                                    <a href="javascript:void(0);">
                                                        <img src="assets/img/icons/google.png" className="me-2" alt="google" />
                                                        Sign Up using Google
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);">
                                                        <img src="assets/img/icons/facebook.png" className="me-2" alt="facebook" />
                                                        Sign Up using Facebook
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="login-img">
                                <img src="assets/img/login.jpg" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
