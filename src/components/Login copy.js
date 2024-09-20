import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', { email, password }, { withCredentials: true });

            if (response.status === 200) {
                //Login is successful. Redirect to user dashboard
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
                <div class="main-wrapper">
                    <div class="account-content">
            <div class="login-wrapper">
                <div class="login-content">
                    <div class="login-userset">
                        <div class="login-logo">
                            <img src="/assets/img/logo.png" alt="img" />
                        </div>
                        <div class="login-userheading">
                            <h3>Sign In</h3>
                            <h4>Please login to your account</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div class="form-login">
                            <p className="text-danger">{message}</p>
                            </div>
                            <div class="form-login">
                            <label>Email</label>
                            <div class="form-addons">
                                <input type="text" placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                                <img src="/assets/img/icons/mail.svg" alt="img" />
                            </div>
                        </div>
                        <div class="form-login">
                            <label>Password</label>
                            <div class="pass-group">
                                <input type="password" class="pass-input" placeholder="Enter your password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required />
                                    
                                <span class="fas toggle-password fa-eye-slash"></span>
                            </div>
                        </div>
                        <div class="form-login">
                            <div class="alreadyuser">
                                <h4><a href="forgetpassword.html" class="hover-a">Forgot Password?</a></h4>
                            </div>
                        </div>
                        <div>
                            <input type='check'>I ag</input>
                        </div>
                        <div class="form-login">
                            <button type="submit" className="btn btn-login">Login</button>

                        </div>
                        <div class="signinform text-center">
                            <h4>Don’t have an account? <a href="/register" class="hover-a">Register Here</a></h4>
                        </div>
                        <div class="form-setlogin">
                            <h4>Or sign up with</h4>
                        </div>
                        <div class="form-sociallink">
                            <ul>
                                <li>
                                    <a href="javascript:void(0);">
                                        <img src="assets/img/icons/google.png" class="me-2" alt="google" />
                                        Sign Up using Google
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">
                                        <img src="assets/img/icons/facebook.png" class="me-2" alt="google" />
                                        Sign Up using Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </form>
                    </div>
                </div>
                <div class="login-img">
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
