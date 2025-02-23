import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Select from 'react-select';

const Dashboard = ({ userData, handleLogout, users }) => {
    const [filteredUsers, setFilteredUsers] = useState(users || []);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        if (users) {
            setFilteredUsers(users);
        }
    }, [users]);

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ];

    const handleStatusFilterChange = (selectedOption) => {
        setSelectedStatus(selectedOption);

        if (selectedOption) {
            setFilteredUsers(users ? users.filter(user => user.status === selectedOption.value) : []);
        } else {
            setFilteredUsers(users || []);
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            {/* Display user data */}
            <p>Welcome, {userData ? userData.firstName : 'User'}!</p>
            <p>Email: {userData ? userData.email : ''}</p>

            <div className="filter-container">
                <Select
                    options={statusOptions}
                    isClearable={true}
                    placeholder="Filter Users by Status"
                    value={selectedStatus}
                    onChange={handleStatusFilterChange}
                />
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers && filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="3">No users found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;