import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FaBoxOpen, FaClock } from 'react-icons/fa';
import { BsFilePost } from 'react-icons/bs';

import DashboardSideBar from '../partials/DashboardSidebar';
import Blogposts from './Blogposts';
import Companies from './Companies';
import ProductsQueue from './ProductsQueue';
import Products from './Products';

const AdminDashboard = (props) => {
  // Fetches the params
  // const pathname = props.location.pathname;
  // const searchParams = new URLSearchParams(
  //   pathname.substring(pathname.indexOf('product/') + 8)
  // );
  // const objectSearchParams = Object.fromEntries(searchParams.entries());
  // let { productID, companyProducts } = objectSearchParams;
  // companyProducts = JSON.parse(companyProducts);
  // const productInfo = objectSearchParams;

  // State variables for the current tab selected
  const [tabSelected, setTabSelected] = useState(0);
  return (
    <DashboardSideBar
      onTabChange={(newTabIndex) => {
        setTabSelected(newTabIndex);
      }}
      currentTabSelected={tabSelected}
      tabs={[
        {
          title: 'Companies',
          image: <FaBoxOpen />,
          page: <Companies />
        },
        {
          title: 'Products',
          image: <FaBoxOpen />,
          page: <Products />
        },
        {
          title: 'Products Queue',
          image: <FaClock />,
          page: <ProductsQueue />
        },
        {
          title: 'Blog posts',
          image: <BsFilePost size={19} />,
          page: <Blogposts />
        }
      ]}
    />
  );
};
export default withRouter(AdminDashboard);
