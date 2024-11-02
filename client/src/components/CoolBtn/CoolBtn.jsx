import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function CoolButton({ isDarkMode, onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                w-12 h-12 flex items-center justify-center
                rounded-full p-2 
                bg-gradient-to-r from-primary to-secondary 
                dark:from-dark-primary dark:to-dark-secondary
                hover:bg-gradient-to-l hover:from-accent hover:to-secondary 
                dark:hover:from-dark-accent dark:hover:to-dark-secondary
                transition-transform duration-300 ease-in-out
                shadow-md dark:shadow-gray-800
                transform hover:scale-110 active:scale-95
            "
        >
            <FontAwesomeIcon
                icon={isDarkMode ? faMoon : faSun}
                className="text-white dark:text-gray-300"
                size="lg"
            />
        </button>
    );
}

export default CoolButton;