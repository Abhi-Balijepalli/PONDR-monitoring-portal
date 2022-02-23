import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/actions/authActions';
import Transition from '../utils/Transition.js';
import Dropdown from '../utils/Dropdown';

const Header = (props) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [top, setTop] = useState(true);

  const mobileNav = useRef(null);

  // close the mobile menu on click outsidemy
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNavOpen || mobileNav.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  const history = useHistory();

  // Declares a variable to store the className of the header links. Also checks to see which tab is selected
  const baseHeaderClassname =
    'text-blue-pondr hover:text-blue-pondrdark px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out outline-none';
  const currentSelectedPathname = window.location.pathname;

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-80 transition duration-300 ease-in-out ${!top && 'bg-white blur shadow-lg'
        }`}
    >
      <div className='max-w-6xl mx-auto px-5 sm:px-6'>
        <div className='flex items-center justify-between h-16 md:h-20  outline-none'>
          {/* Site branding */}

          {/* Desktop navigation */}
          <nav className='hidden md:flex md:flex-grow'>
            {/* Desktop menu links */}
            <ul className='flex flex-grow justify-end flex-wrap items-center'>
            </ul>

            {/* Desktop sign in links */}
            {!props.auth.uid ? (
              <>
                <ul className='flex flex-grow justify-end flex-wrap items-center'>
                  <li>
                    <Link
                      to='/signin'
                      className='btn-sm font-bold rounded-3xl pl-8 pr-8 text-gray-200 bg-blue-pondr hover:bg-blue-pondrdark ml-3 outline-none'
                    >
                      <span>Login</span>
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <ul className='flex flex-grow justify-end flex-wrap items-center'>
                <li>
                  <span
                    onClick={() => {
                      props.signOut();
                      history.push('/signin');
                    }}
                    className='btn-sm rounded-3xl font-bold pl-8 pr-8 text-white bg-blue-pondr hover:bg-blue-pondrdark ml-3'
                  >
                    <span>Sign out</span>

                    <path
                      d='M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z'
                      fillRule='nonzero'
                    />
                  </span>
                </li>
              </ul>
            )}
          </nav>

          {/* Mobile menu */}
          <div className='flex md:hidden'>
            {/* Hamburger button */}
            <button
              className={`hamburger ${mobileNavOpen && 'active'}`}
              aria-controls='mobile-nav'
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className='sr-only'>Menu</span>
              <svg
                className='w-6 h-6 fill-current text-gray-900'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect y='4' width='24' height='2' />
                <rect y='11' width='24' height='2' />
                <rect y='18' width='24' height='2' />
              </svg>
            </button>

            {/* Mobile navigation */}
            <div ref={mobileNav}>
              <Transition
                show={mobileNavOpen}
                tag='nav'
                id='mobile-nav'
                className='absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white transition-all duration-300 ease-in-out'
                enter='transition ease-out duration-200 transform'
                enterStart='opacity-0 -translate-y-2'
                enterEnd='opacity-100 translate-y-0'
                leave='transition ease-out duration-200'
                leaveStart='opacity-100'
                leaveEnd='opacity-0'
              >
                <div><h1>"Desktop Mode Only"</h1></div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (creds) => {
      dispatch(signOut(creds));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
