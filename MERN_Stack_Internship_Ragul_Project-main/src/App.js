import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={
                    localStorage.getItem('isLoggedIn') === 'true' ? <Dashboard /> : <Navigate to="/" />
                } />
            </Routes>
        </Router>
    );
}

export default App;