import React, { useState, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const RoleContext = createContext();

export const RoleContextProvider = ({ children }) => {
    const [role, setRole] = useState('guest'); // Default role is 'guest'
    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
}

const Auth = ({ isSignUp = false }) => {
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignUpMode, setIsSignUpMode] = useState(isSignUp);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const { role, setRole } = useContext(RoleContext);

    // Load the logged-in user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setLoggedInUser(user);
            setRole(user.role); // Set the role from the stored user
        }
    }, [setRole]);

    const togglePopup = () => {
        setIsActive(prev => !prev);
    };

    const toggleProfilePopup = () => {
        setShowProfilePopup(prev => !prev);
    };

    const toggleMode = () => {
        setIsSignUpMode(prev => !prev);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUpMode) {
            // Sign Up Logic
            if (password !== confirmPassword) {
                alert("Passwords don't match");
                return;
            }
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);
            if (userExists) {
                alert('User already exists. Please sign in.');
                return;
            }
            const newUser = { email, password, role };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            setLoggedInUser(newUser);
            setRole(newUser.role); // Set the role of the new user
            alert('Sign up successful!');
            window.location.reload(); // Refresh the page after login
        } else {
            // Sign In Logic
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);
            if (!user) {
                alert('Invalid email or password');
                return;
            }
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            setLoggedInUser(user);
            setRole(user.role); // Set the role of the logged-in user
            alert('Sign in successful!');
            window.location.reload(); // Refresh the page after login
        }

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsActive(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        setRole('guest'); // Reset role to 'guest' on logout
        setShowProfilePopup(false);
        window.location.reload(); // Refresh the page after logout
    };

    return (
        <>
            {!loggedInUser ? (
                <button
                    onClick={togglePopup}
                    className="text-white hover:text-dark-primary transition-colors duration-300 focus:outline-none"
                    aria-label={isSignUpMode ? 'Sign Up' : 'Sign In'}
                >
                    <FontAwesomeIcon icon={faUser} size="lg" />
                </button>
            ) : (
                <>
                    <button
                        onClick={toggleProfilePopup}
                        className="text-white hover:text-dark-primary transition-colors duration-300 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faUser} size="lg" />
                    </button>

                    {showProfilePopup && createPortal(
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                            <div className="bg-white w-80 p-6 rounded-lg shadow-xl relative">
                                <button
                                    onClick={toggleProfilePopup}
                                    className="absolute right-4 top-4 text-gray-600 hover:text-gray-800 text-2xl"
                                >
                                    ×
                                </button>
                                <h2 className="text-lg mb-4 text-gray-800">Hello, {loggedInUser.email}</h2>
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 mb-3"
                                >
                                    Logout
                                </button>
                                <button
                                    className="w-full bg-gray-600 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
                                >
                                    Settings
                                </button>
                            </div>
                        </div>,
                        document.body
                    )}
                </>
            )}

            {/* Auth popup for sign in/sign up */}
            {createPortal(
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isActive ? '' : 'hidden'}`}>
                    <div className="bg-white w-96 p-8 rounded-lg shadow-xl relative">
                        <button
                            onClick={togglePopup}
                            className="absolute right-4 top-4 text-gray-600 hover:text-gray-800 text-2xl"
                        >
                            ×
                        </button>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                            {isSignUpMode ? 'Sign Up' : 'Sign In'}
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {isSignUpMode && (
                                <>
                                    <div>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Role</label>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                            >
                                {isSignUpMode ? 'Sign Up' : 'Sign In'}
                            </button>
                        </form>
                        <p className="mt-4 text-gray-600">
                            {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button onClick={toggleMode} className="text-blue-600 hover:underline">
                                {isSignUpMode ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default Auth;