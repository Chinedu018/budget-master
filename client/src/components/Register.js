import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Standard');
    const [agreeToTnC, setAgreeToTnC] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!name || !email || !password) {
            setMessage('All fields are required.');
            return;
        }

        if (password.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            return;
        }

        if (!agreeToTnC) {
            setMessage('You must agree to the Terms and Conditions.');
            return;
        }

        // Construct the user data object
        const userData = { name, email, password, role };

        try {
            const response = await api.post('/auth/register', userData, { withCredentials: true });

            if (response.status === 201) {
                // Registration is successful. Redirect to login page
                setSuccess(true);
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 5000); 
                    // Redirect after 5 seconds to allow user to see feedback
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Registration Failed. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="main-wrapper">
                <div className="account-content">
                    <div className="login-wrapper">
                        <div className="login-content">
                            <div className="login-userset">
                                <div className="login-logo">
                                    <img src="assets/img/logo.png" alt="img" />
                                </div>
                                <div className="login-userheading">
                                    <h3>Create an Account</h3>
                                    <h4>Continue where you left off</h4>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-login">
                                        {message && <p className={success ? 'text-success' : 'text-danger'}>{message}</p>}
                                    </div>
                                    <div className="form-login">
                                        <label>Full Name</label>
                                        <div className="form-addons">
                                            <input type="text" placeholder="Enter your full name" 
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required />
                                            <img src="assets/img/icons/users1.svg" alt="img" />
                                        </div>
                                    </div>
                                    <div className="form-login">
                                        <label>Email</label>
                                        <div className="form-addons">
                                            <input type="email" placeholder="Enter your email address"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required />
                                            <img src="assets/img/icons/mail.svg" alt="img" />
                                        </div>
                                    </div>
                                    <div className="form-login">
                                        <label>Password</label>
                                        <div className="pass-group">
                                            <input type="password" className="pass-input" placeholder="Enter your password" 
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required />
                                            <span className="fas toggle-password fa-eye-slash"></span>
                                        </div>
                                    </div>
                                    <div className="form-login">
                                        <label>Role</label>
                                        <div className="form-addons">
                                            <select className='form-control'
                                                id="role"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}>
                                                <option value="Standard">Standard</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                            <span className="fas toggle-password fa-eye-slash"></span>
                                        </div>
                                    </div>
                                    <div className="">
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
                                    </div>
                                    <div className="form-login">
                                        <button type='submit' className="btn btn-login">Register</button>
                                    </div>
                                </form>
                                <div className="signinform text-center">
                                    <h4>Already a user? <a href="/login" className="hover-a">Login In here</a></h4>
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
                            </div>
                        </div>
                        <div className="login-img">
                            <img src="assets/img/login.jpg" alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
