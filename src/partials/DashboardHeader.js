import React from 'react';

function WelcomeBanner () {
  return (
    <div
      className='w-3/5 bg-blue-pondr rounded-xl p-6 mx-auto mb-8'
      data-aos='fade-down'
    >
      {/* Content */}
      <div className='text-white'>
        <h1 className='text-2xl md:text-3xl text-white font-bold mb-1 '>
          Welcome to Pondr Demo 👋
        </h1>
        <p>
          {' '}
          Click around the dashboard and explore all our powerful features!
        </p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
