import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  return (
    <footer>
      <div className='max-w-4xl mx-auto px-4 sm:px-6'>
        {/* </div> */}

        {/* Bottom area */}
        <div className='flex flex-col sm:flex-row items-center justify-between py-4 md:py-8 border-t border-gray-200'>
          {/* Copyrights note */}

          <div
            className='flex flex-row items-center justify-between w-full sm:w-3/5'
          >
            <Link
              to='/privacy-policy'
              className='text-sm text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out outline-none'
            >
              Privacy Policy
            </Link>
            <Link
              to='/terms'
              className='text-sm text-gray-600 pl-30 hover:text-gray-900 hover:underline transition duration-150 ease-in-out outline-none'
            >
              Terms and Conditions
            </Link>
          </div>
          <div
            className='mt-5 sm:mt-0 flex justify-evenly items-center w-full sm:w-1/3'
          >
            <SocialIcon
              url='https://www.linkedin.com/company/letspondr/'
              style={{
                minWidth: '25px',
                minHeight: '25px',
                width: '2.5vw',
                height: '2.5vw',
                maxHeight: '50px',
                maxWidth: '50px'
              }}
            />
            <SocialIcon
              url='https://instagram.com/letspondr'
              style={{
                minWidth: '25px',
                minHeight: '25px',
                width: '2.5vw',
                maxHeight: '50px',
                maxWidth: '50px',
                height: '2.5vw'
              }}
            />
            <SocialIcon
              url='https://facebook.com/letspondr'
              style={{
                minWidth: '25px',
                minHeight: '25px',
                maxHeight: '50px',
                maxWidth: '50px',
                width: '2.5vw',
                height: '2.5vw'
              }}
            />
            <SocialIcon
              url='https://twitter.com/letspondr'
              style={{
                minWidth: '25px',
                minHeight: '25px',
                maxHeight: '50px',
                maxWidth: '50px',
                width: '2.5vw',
                height: '2.5vw'
              }}
            />
          </div>
        </div>
        <div className='text-xs text-gray-600 mb-4 text-center'>
          {' '}
          &copy; 2021 Copyright Pondr. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
