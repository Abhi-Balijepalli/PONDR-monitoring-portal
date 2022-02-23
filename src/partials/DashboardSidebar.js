import React from 'react';
import { useHistory } from 'react-router-dom';
// import { FaBoxOpen, FaSlidersH, FaBolt, FaQuestionCircle, FaComments, FaHome, FaBalanceScale } from 'react-icons/fa';
import Wrapper from '../utils/Wrapper';
import DashboardTopHeader from '../partials/DashboardTopHeader';

const DashboardSidebar = ({ tabs, currentTabSelected, onTabChange, isDemo }) => {
  // This is the history hook
  const history = useHistory();

  // Renders each item in the list
  const renderTab = ({ title, onPress, image, index }) => {
    return (
      <li
        key={index}
        className={`w-11/12 py-4 ml-2 rounded-sm text-white mb-0.5 last:mb-0 mr-5  ${currentTabSelected === index && 'bg-blue-pondr opacity-60'
          }`}
      >
        <div
          onClick={() => {
            if (onPress) {
              onPress();
            } else {
              onTabChange(index);
            }
          }}
          className='text-gray-600 hover:text-black transition duration-150 cursor-pointer'
        >
          <div className='flex flex-grow items-center'>
            <div className={`flex-shrink-0 mx-4 h-7 w-1/12 ${currentTabSelected === index && 'text-white'}`}>{image}</div>
            <div />
            <hr className='my-2' />
            <span
              className={`text-sm lg:text-md font-medium  ${currentTabSelected === index && 'text-white'
                }`}
            >
              {title}
            </span>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className='flex justify-between'>

      <div className='w-1/7 min-w-48'>
        {/* Sidebar */}
        <div
          className={`fixed z-40 left-0 top-0 static left-auto top-auto translate-x-0  transform h-full w-1/6 mr-10 min-w-48 flex-shrink-0 py-5 transition-transform duration-200 ease-in-out ${'translate-x-0  bg-white  shadow-xl pr-5 '}`}
        >
          {/* Sidebar header */}
          {/* Close/Open button */}

          <div className='flex justify-between pr-3 sm:px-2 pb-10'>
            {/* Logo */}
            <div
              className='block pt-10 items-center cursor-pointer'
              onClick={() =>
                isDemo ? history.push('/') : history.push('/enterprise/dashboard')}
            >
              {/* <img
              className='w-auto rounded'
              src={require('../images/Asset 25@2x.png')}
              alt='pondr-blue-logo'
              class='responsive'
              className='center'
              width='130'
              height='100'
            /> */}
              <p className='h3 text-center w-full'>Pondr Admin</p>
            </div>
            <div className='pb-10' />
          </div>

          <ul className='mt-5 ml-3 mr-3'>
            {
              tabs.map((tab, index) => {
                tab.index = index;
                return renderTab(tab);
              })
            }
          </ul>
        </div>
      </div>
      <Wrapper dontShowHeader isGrey topHead>
        <DashboardTopHeader />
        <div className='pb-10' />
        <div className='w-full mx-auto'>{tabs[currentTabSelected].page || <p>Tab doesn't have page assigned!!</p>}</div>
      </Wrapper>
    </div>
  );
};

export default DashboardSidebar;
