import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faGlobe, faMoon, faSun, faUsers } from '@fortawesome/free-solid-svg-icons';
import LOGO from '../../assets/logo/rio-.png';
import { Link } from 'react-router-dom';
import Auth from '../../components/Auth/Auth';
import LanguageSelector from '../Language/Language';
import About from '../AboutGemify/AboutGemify'; // Import the About component

function Navbar({ darkMode, setDarkMode }) {
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);
    const [isLanguageSelectorClicked, setIsLanguageSelectorClicked] = useState(false);
    const [showUsersPopup, setShowUsersPopup] = useState(false);
    const [users, setUsers] = useState([]);
    const languageSelectorRef = useRef(null);
    const aboutSectionRef = useRef(null); // Define the reference for the About section
    const [loggedInUser, setLoggedInUser] = useState(null);

    const scrollToAbout = () => {
        if (aboutSectionRef.current) {
            aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToGamesSection = () => {
        if (gamesSectionRef.current) {
            gamesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (loggedInUser && loggedInUser.role === 'admin') {
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            setUsers(storedUsers);
        }
    }, [loggedInUser]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        setShowUsersPopup(false); // Hide the users popup when logging out
    };

    const handleClickOutside = (event) => {
        if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target)) {
            setShowLanguageSelector(false);
            setIsLanguageSelectorClicked(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const icons = [
        { component: Auth, icon: faUser },
        { icon: faHeart, hoverClass: 'hover:text-red-500' },
        {
            icon: faGlobe,
            onMouseEnter: () => setShowLanguageSelector(true),
            onMouseLeave: () => !isLanguageSelectorClicked && setShowLanguageSelector(false),
            onClick: () => {
                setIsLanguageSelectorClicked(!isLanguageSelectorClicked);
                setShowLanguageSelector(true);
            }
        }
    ];

    return (
        <>
            <nav className={`flex justify-between items-center ${darkMode ? 'bg-dark-secondary' : 'bg-black'} fixed top-0 left-0 right-0 shadow-lg z-50`}>
                {/* Icons Section */}
                <div className="pl-4 flex items-center space-x-4 text-white">
                    {icons.map((item, idx) => (
                        <div
                            key={idx}
                            className="relative flex justify-center items-center w-8 h-8 border-2 border-solid border-white rounded-full"
                            onMouseEnter={item.onMouseEnter}
                            onMouseLeave={item.onMouseLeave}
                            onClick={item.onClick}
                            ref={item.icon === faGlobe ? languageSelectorRef : null}
                        >
                            {item.component ? (
                                <Auth />
                            ) : (
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    size="1x"
                                    className={`cursor-pointer transition-colors duration-300 ${item.hoverClass || ''}`}
                                />
                            )}
                            {item.icon === faGlobe && (showLanguageSelector || isLanguageSelectorClicked) && (
                                <div className="absolute top-full z-40 left-0 mt-2">
                                    <LanguageSelector />
                                </div>
                            )}
                        </div>
                    ))}
                    {loggedInUser && loggedInUser.role === 'admin' && (
                        <div
                            className="relative flex justify-center items-center w-8 h-8 border-2 border-solid border-white rounded-full"
                            onClick={() => setShowUsersPopup(true)}
                        >
                            <FontAwesomeIcon
                                icon={faUsers}
                                size="1x"
                                className="cursor-pointer transition-colors duration-300"
                            />
                        </div>
                    )}
                </div>

                {/* Navigation Links */}
                <div className="space-x-4 font-thin text-xl text-white">
                    <Link to="/home" className="hover:text-dark-primary">
                        Home
                    </Link>
                    <Link to="/home#games"
                        onClick={() => scrollToGamesSection()}
                        className="hover:text-dark-primary cursor-pointer">
                        Games
                    </Link>
                    <button onClick={scrollToAbout} className="hover:text-dark-primary">
                        About Us
                    </button>
                    <Link to="/settings" className="hover:text-dark-primary">
                        Settings
                    </Link>
                </div>

                {/* Dark Mode Toggle & Logo */}
                <div className="flex items-center">
                    <div className="pr-6">
                        <button onClick={toggleDarkMode} className="flex items-center text-white">
                            <FontAwesomeIcon className="text-white" icon={darkMode ? faMoon : faSun} size="lg" />
                            <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>
                    </div>
                    <div className="flex items-center">
                        <img src={LOGO} alt="rio-logo" className="w-12" />
                    </div>
                </div>
            </nav>


            {/* Popup for users list */}
            {loggedInUser && loggedInUser.role === 'admin' && showUsersPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white w-80 p-6 rounded-lg shadow-xl relative">
                        <button
                            onClick={() => setShowUsersPopup(false)}
                            className="absolute right-4 top-4 text-gray-600 hover:text-gray-800 text-2xl"
                        >
                            ×
                        </button>
                        <h2 className="text-lg mb-4 text-gray-800">All Users</h2>

                        <div className="space-y-2">
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <div key={index} className="border-b border-gray-300 py-2">
                                        <span className="text-gray-800">{user.email} ({user.role})</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No users found</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;