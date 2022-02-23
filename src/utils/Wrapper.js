import React, { useEffect } from 'react';

import Header from '../partials/Header';
import Footer from '../partials/Footer';

const Wrapper = (props) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className='flex flex-col w-full min-h-screen'>
      {/*  Site header */}
      {props.dontShowHeader ? null : <Header />}
      {/*  Page content */}
      <main className='flex-grow'>
        {/*  Page sections */}
        <section className={props.isGrey ? 'bg-gray-100' : ''}>
          <section className={props.topHead ? 'relative flex w-full flex-row flex-1 overflow-y-auto overflow-x-hidden' : ''} />
          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
            <div
              className={
                props.dontShowHeader
                  ? 'pt-8 pb-12 md:pt-16 md:pb-20'
                  : 'pt-32 pb-12 md:pt-40 md:pb-20'
              }
            >
              {props.children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wrapper;
