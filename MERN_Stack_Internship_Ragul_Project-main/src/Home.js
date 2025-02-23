import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css';
import Dashboard from './Dashboard';
import logo from './logo.jpeg';

const Home = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const mockUsers = [
        { username: 'testuser', password: 'password', email: 'test@example.com', status: 'active', firstName: 'Test', lastName: 'User' },
        { username: 'user2', password: 'password2', email: 'user2@example.com', status: 'inactive', firstName: 'User', lastName: 'Two' },
        { username: 'Rakshan', password: '1475', email: 'rakshan@gmail.com', status: 'active', firstName: 'Rakshan', lastName: 'B' }
        // ... more users
    ];

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (!isLogin) { // Signup
                const newUser = {
                    username,
                    password,
                    firstName,
                    lastName,
                    email,
                    status: 'active'
                };

                mockUsers.push(newUser);
                toast.success("Signup Successful! Please Login.");
                setIsLogin(true);
            } else { // Login
                const user = mockUsers.find(u => u.username === username && u.password === password);

                if (!user) {
                    throw new Error('Invalid credentials');
                }

                setUserData(user);
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
                toast.success('Login Successful!');
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }

        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setEmail('');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        setUserData(null);
        navigate('/');
        toast.info('Logged Out!');
    };

    return (
        <div className="home-container">  {/* No background div here */}
            <div className="form-card">
                <div className="logo-container">
                    <img src={logo} alt="Personal Finance Manager Logo" className="logo" /> {/* Added alt text */}
                </div>
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    {!isLogin && (
                        <>
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </>
                    )}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => setIsLogin(!isLogin)} className="link-button">
                            {isLogin ? "Sign Up" : "Login"}
                        </button>
                    </p>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
            {isLoggedIn && userData && (<Dashboard userData={userData} handleLogout={handleLogout} users={mockUsers} />)}
        </div>
    );
};

export default Home;