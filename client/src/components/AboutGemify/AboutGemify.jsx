// import React from 'react';

// function AboutGamify() {
//   return (
//     <>
//     <div className='h-[40vh]'></div>
//     <div className='flex w-[100vw] ref={aboutSectionRef} justify-center animate-fadeIn'>
//     <div className="flex flex-col items-center w-[70vw] justify-center bg-gradient-to-r from-dark-primary via-primary to-blue-500 text-white p-8 rounded-lg shadow-lg">
//       <h1 className="text-4xl font-extrabold mb-4 text-center">Welcome to <span className="text-yellow-300">Gamify</span></h1>
//       <p className="text-lg text-center max-w-3xl leading-relaxed">
//         Gamify is a place where the world is just as colorful and exciting as it was when we were kids. Created by Philip Shvalb, 
//         it's inspired by the joy and wonder that children see in every moment. This site is your space to let go, play, and be carefree—just like you're meant to be!
//       </p>
//       <p className="text-lg text-center max-w-3xl leading-relaxed mt-4">
//         Here, the bright colors, fun games, and cheerful vibes invite you to take a break from life's challenges, helping you escape into a playful world for a little while.
//         Gamify is more than just a gaming site—it's a reminder that there's always time to embrace your inner child and rediscover joy.
//       </p>
//     </div>
//     </div>
//     </>
//   );
// }

// export default AboutGamify;

import React, { forwardRef } from 'react';

// About component using forwardRef
const About = forwardRef((props, ref) => {
  return (
    <>
      <div className='h-[40vh]'></div>
      <div ref={ref} className='flex w-[100vw] justify-center animate-fadeIn'>
        <div className="flex flex-col items-center w-[70vw] justify-center bg-gradient-to-r from-dark-primary via-primary to-blue-500 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold mb-4 text-center">Welcome to <span className="text-yellow-300">Gamify</span></h1>
          <p className="text-lg text-center max-w-3xl leading-relaxed">
            Gamify is a place where the world is just as colorful and exciting as it was when we were kids. Created by Philip Shvalb, 
            it's inspired by the joy and wonder that children see in every moment. This site is your space to let go, play, and be carefree—just like you're meant to be!
          </p>
          <p className="text-lg text-center max-w-3xl leading-relaxed mt-4">
            Here, the bright colors, fun games, and cheerful vibes invite you to take a break from life's challenges, helping you escape into a playful world for a little while.
            Gamify is more than just a gaming site—it's a reminder that there's always time to embrace your inner child and rediscover joy.
          </p>
        </div>
      </div>
    </>
  );
});

export default About;