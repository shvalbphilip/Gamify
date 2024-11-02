import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'עברית' },
  { code: 'ru', name: 'Русский' },
];

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative w-40" ref={dropdownRef}>
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon={faGlobe} className="mr-2 h-4 w-4" />
        <span>{selectedLanguage.name}</span>
        <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-4 w-4" />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {languages.map((language) => (
            <li
              key={language.code}
              className={`${
                selectedLanguage.code === language.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100`}
              onClick={() => selectLanguage(language)}
            >
              <div className="flex items-center">
                <span className={`${selectedLanguage.code === language.code ? 'font-semibold' : 'font-normal'} ml-3 block truncate`}>
                  {language.name}
                </span>
              </div>
              {selectedLanguage.code === language.code && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Language;