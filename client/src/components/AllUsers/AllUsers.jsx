import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from localStorage or API
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index} className="border-b py-2">
                        {user.email} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllUsers;