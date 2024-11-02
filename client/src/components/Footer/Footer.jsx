import React from 'react';
import LOGO from '../../assets/logo/rio-.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="bg-transparent dark:bg-dark dark:bg-dark-secondry text-accent dark:text-secondary py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Left side - Logo and Copyright */}
                <div className="flex flex-col md:flex-row items-center space-x-4">
                    <img src={LOGO} alt="logo" className="w-12 h-12 mb-2 md:mb-0" />
                    <p className="text-lg"><span className='text-[3vw]'>&copy;</span> 2024 <span className='text-primary dark:text-dark-primary'>Gamify</span> All rights reserved.</p>
                </div>

                {/* Middle - Links */}
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="/contact" className="hover:underline text-lg">Contact</a>
                    <a href="/privacy" className="hover:underline text-lg">Privacy Policy</a>
                </div>

                {/* Right side - Social Icons */}
                <div className="flex space-x-4 text-accent dark:text-secondary mt-4 md:mt-0">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-lg hover:text-gray-400">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-lg hover:text-gray-400">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-lg hover:text-gray-400">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-lg hover:text-gray-400">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;