// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Mario from '../../assets/images/Mario3_.png';
// import Game2048 from '../../assets/images/2048-game.png';
// import SnakeGame from '../../assets/images/SnakeGame.png';
// import SnakesAndLetters from '../../assets/images/snake-letters-game.png';
// import GameImage3 from '../../assets/images/Mario3_black&white.png'
// import About from '../../components/AboutGemify/AboutGemify';
// import Footer from '../../components/Footer/Footer';

// function Home() {
//     const Words = ['MEN', 'WOMEN', 'CHILDREN', 'ELDERLY', 'YOUTH', 'EVERYONE'];
//     const [currentWord, setCurrentWord] = useState('');
//     const [showMario, setShowMario] = useState(false);
//     const [showWe, setShowWe] = useState(false);
//     const [showServe, setShowServe] = useState(false);
//     const [showWordArray, setShowWordArray] = useState(false);
//     const [showStar, setShowStar] = useState(false);
//     const [displayedQuote, setDisplayedQuote] = useState('');
//     const [quoteIndex, setQuoteIndex] = useState(0);
//     const [showGames, setShowGames] = useState(false);
//     const quote = '"If you can dream it, you can do it." -Walt Disney';

//     const navigate = useNavigate();

//     // Refs for sections
//     const gamesSectionRef = useRef(null);
//     const aboutSectionRef = useRef(null);

//     useEffect(() => {
//         const weTimeout = setTimeout(() => setShowWe(true), 1000);
//         const serveTimeout = setTimeout(() => setShowServe(true), 1300);
//         const wordArrayTimeout = setTimeout(() => setShowWordArray(true), 1600);
//         const marioTimeout = setTimeout(() => setShowMario(true), 4000);
//         const gamesTimeout = setTimeout(() => setShowGames(true), 6000);
//         return () => {
//             clearTimeout(weTimeout);
//             clearTimeout(serveTimeout);
//             clearTimeout(wordArrayTimeout);
//             clearTimeout(marioTimeout);
//             clearTimeout(gamesTimeout);
//         };
//     }, []);

//     useEffect(() => {
//         if (!showWordArray) return;

//         let index = 0;
//         const interval = setInterval(() => {
//             setCurrentWord(Words[index]);

//             if (Words[index] === 'EVERYONE') {
//                 setShowStar(true);
//                 clearInterval(interval);
//             } else {
//                 index = (index + 1) % Words.length;
//             }
//         }, 500);

//         return () => clearInterval(interval);
//     }, [showWordArray]);

//     useEffect(() => {
//         if (!showStar) return;

//         const typingInterval = setInterval(() => {
//             if (quoteIndex < quote.length) {
//                 setDisplayedQuote((prev) => prev + quote[quoteIndex]);
//                 setQuoteIndex((prevIndex) => prevIndex + 1);
//             }
//         }, 100);

//         return () => clearInterval(typingInterval);
//     }, [quoteIndex, showStar, quote]);

//     // Function to handle navigation
//     const handleNavigation = (path) => {
//         navigate(path);
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-black dark:bg-white">
//             <div className="flex-grow flex flex-col md:flex-row justify-center items-center px-6 relative z-10">
//                 <div className="flex flex-col justify-center items-start md:w-1/2">
//                     <div className="h-[14vw]">
//                         {showWe && (
//                             <h1 className="text-white tracking-[1vw] dark:text-black text-[14vw] font-extrabold leading-none animate-fadeIn">
//                                 WE
//                             </h1>
//                         )}
//                     </div>
//                     <div className="h-[14vw]">
//                         {showServe && (
//                             <h1 className="text-white tracking-[1vw] dark:text-black text-[14vw] font-extrabold leading-none animate-fadeIn">
//                                 SERVE
//                             </h1>
//                         )}
//                     </div>
//                     <div className="h-[14vw] flex items-center">
//                         {showWordArray && (
//                             <>
//                                 <h1 className="text-white tracking-[1vw] dark:text-black text-[14vw] font-extrabold leading-none">
//                                     {currentWord}
//                                 </h1>
//                                 {showStar && (
//                                     <span className="text-white dark:text-black text-[12vw] font-extrabold leading-none ml-2">
//                                         *
//                                     </span>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                     {showStar && (
//                         <p className="relative bottom-10 w-[800px] text-white dark:text-black font-bold font-mono text-[1.3vw] italic mt-4 leading-loose animate-fadeIn">
//                             {displayedQuote}
//                         </p>
//                     )}
//                 </div>

//                 <div className="flex items-center justify-center md:w-1/2">
//                     {showMario && (
//                         <img className="w-[40vw] justify-center pl-20 max-w-full animate-fadeIn" src={Mario} alt="Mario" />
//                     )}
//                 </div>
//             </div>

//             {showGames && (
//                 <div className="w-full p-6 mt-12 animate-fadeIn" ref={gamesSectionRef}>
//                     <h1 className="text-white dark:text-secondary text-center text-[7vw] mb-12">Games</h1>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                         <div className="col-span-1" onClick={() => handleNavigation('/games/2048')}>
//                             <img src={Game2048} alt="2048 Game" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
//                         </div>
//                         <div className="col-span-1" onClick={() => handleNavigation('/games/snake')}>
//                             <img src={SnakeGame} alt="Snake Game" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
//                         </div>
//                         <div className="col-span-1" onClick={() => handleNavigation('/games/Snakes-and-Ladders')}>
//                             <img src={SnakesAndLetters} alt="Snakes And Letters" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
//                         </div>
//                         <div className="col-span-1" onClick={() => handleNavigation('/games/game1')}>
//                             <img src={GameImage3} alt="Game 3" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
//                         </div>
//                         <div className="col-span-1">
//                             <img src={GameImage3} alt="Game 3" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
//                         </div>
//                         <div className="col-span-1">
//                             <img src={GameImage3} alt="Game 3" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showGames && (
//                 <div className="accordian w-full h-[500px] text-white justify-center mt-12 mx-auto">
//                     {/* ... (accordion content remains the same) ... */}
//                 </div>
//             )}
//             <About ref={aboutSectionRef} />
//             <Footer />
//         </div>
//     );
// }

// export default Home;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Mario from '../../assets/images/Mario3_.png';
import Game2048 from '../../assets/images/2048-game.png';
import SnakeGame from '../../assets/images/SnakeGame.png';
import SnakesAndLetters from '../../assets/images/snake-letters-game.png';
import GameImage3 from '../../assets/images/Mario3_black&white.png'
import About from '../../components/AboutGemify/AboutGemify';
import Footer from '../../components/Footer/Footer';

function Home() {
    const Words = ['MEN', 'WOMEN', 'CHILDREN', 'ELDERLY', 'YOUTH', 'EVERYONE'];
    const [currentWord, setCurrentWord] = useState('');
    const [showMario, setShowMario] = useState(false);
    const [showWe, setShowWe] = useState(false);
    const [showServe, setShowServe] = useState(false);
    const [showWordArray, setShowWordArray] = useState(false);
    const [showStar, setShowStar] = useState(false);
    const [displayedQuote, setDisplayedQuote] = useState('');
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [showGames, setShowGames] = useState(false);
    const quote = '"If you can dream it, you can do it." -Walt Disney';

    const navigate = useNavigate();

    // Refs for sections
    const gamesSectionRef = useRef(null);
    const aboutSectionRef = useRef(null);

    useEffect(() => {
        const weTimeout = setTimeout(() => setShowWe(true), 1000);
        const serveTimeout = setTimeout(() => setShowServe(true), 1300);
        const wordArrayTimeout = setTimeout(() => setShowWordArray(true), 1600);
        const marioTimeout = setTimeout(() => setShowMario(true), 4000);
        const gamesTimeout = setTimeout(() => setShowGames(true), 6000);
        return () => {
            clearTimeout(weTimeout);
            clearTimeout(serveTimeout);
            clearTimeout(wordArrayTimeout);
            clearTimeout(marioTimeout);
            clearTimeout(gamesTimeout);
        };
    }, []);

    useEffect(() => {
        if (!showWordArray) return;

        let index = 0;
        const interval = setInterval(() => {
            setCurrentWord(Words[index]);

            if (Words[index] === 'EVERYONE') {
                setShowStar(true);
                clearInterval(interval);
            } else {
                index = (index + 1) % Words.length;
            }
        }, 500);

        return () => clearInterval(interval);
    }, [showWordArray]);

    useEffect(() => {
        if (!showStar) return;

        const typingInterval = setInterval(() => {
            if (quoteIndex < quote.length) {
                setDisplayedQuote((prev) => prev + quote[quoteIndex]);
                setQuoteIndex((prevIndex) => prevIndex + 1);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [quoteIndex, showStar, quote]);

    // Function to handle navigation
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex flex-col min-h-screen bg-black dark:bg-white">
            <div className="flex-grow flex flex-col md:flex-row justify-center items-center px-6 relative z-10">
                <div className="flex flex-col justify-center items-start md:w-1/2">
                    <div className="h-[28vw] md:h-[14vw]">
                        {showWe && (
                            <h1 className="text-white tracking-[5vw] md:tracking-[1vw] dark:text-black text-[28vw] md:text-[14vw] font-extrabold leading-none animate-fadeIn">
                                WE
                            </h1>
                        )}
                    </div>
                    <div className="h-[28vw] md:h-[14vw]">
                        {showServe && (
                            <h1 className="text-white tracking-[5vw] md:tracking-[1vw] dark:text-black text-[28vw] md:text-[14vw] font-extrabold leading-none animate-fadeIn">
                                SERVE
                            </h1>
                        )}
                    </div>
                    <div className="h-[28vw] md:h-[14vw] flex items-center">
                        {showWordArray && (
                            <>
                                <h1 className="text-white tracking-[5vw] md:tracking-[1vw] dark:text-black text-[28vw] md:text-[14vw] font-extrabold leading-none">
                                    {currentWord}
                                </h1>
                                {showStar && (
                                    <span className="text-white dark:text-black text-[20vw] md:text-[12vw] font-extrabold leading-none ml-2">
                                        *
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                    {showStar && (
                        <p className="relative bottom-10 max-w-[90%] md:w-[800px] text-white dark:text-black font-bold font-mono text-[4vw] md:text-[1.3vw] italic mt-4 leading-loose animate-fadeIn">
                            {displayedQuote}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-center md:w-1/2 mt-10 md:mt-0">
                    {showMario && (
                        <img className="w-[80vw] md:w-[40vw] justify-center pl-20 max-w-full animate-fadeIn" src={Mario} alt="Mario" />
                    )}
                </div>
            </div>

            {showGames && (
                <div className="w-full p-6 mt-12 animate-fadeIn" ref={gamesSectionRef}>
                    <h1 className="text-white dark:text-secondary text-center text-[10vw] md:text-[7vw] mb-12">Games</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="col-span-1" onClick={() => handleNavigation('/games/2048')}>
                            <img src={Game2048} alt="2048 Game" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
                        </div>
                        <div className="col-span-1" onClick={() => handleNavigation('/games/snake')}>
                            <img src={SnakeGame} alt="Snake Game" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
                        </div>
                        <div className="col-span-1" onClick={() => handleNavigation('/games/Snakes-and-Ladders')}>
                            <img src={SnakesAndLetters} alt="Snakes And Letters" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
                        </div>
                        <div className="col-span-1" onClick={() => handleNavigation('/games/game1')}>
                            <img src={GameImage3} alt="Game 3" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
                        </div>
                        <div className="col-span-1">
                            <img src={GameImage3} alt="Game 3" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
                        </div>
                        <div className="col-span-1">
                            <img src={GameImage3} alt="Game 3" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-primary dark:bg-dark-primary cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}

            {showGames && (
                <div className="accordian w-full h-[500px] text-white justify-center mt-12 mx-auto">
                    {/* ... (accordion content remains the same) ... */}
                </div>
            )}
            <About ref={aboutSectionRef}/>
            <Footer />
        </div>
    );
}

export default Home;