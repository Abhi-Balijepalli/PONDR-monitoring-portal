import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import AdvanceAnalytics from './AdvanceAnalytics/AdvanceAnalytics';
import CategoriesReviews from './AdvanceAnalytics/CategoriesReviews';
// import Tutorial from './Tutorial';
import DashboardSideBar from '../partials/DashboardSidebar';

import AIQuestions from './AdvanceAnalytics/AIQuestions';
import Compare from './AdvanceAnalytics/Compare';
import ReactLoading from 'react-loading';
import { FaRegChartBar, FaBoxOpen, FaSlidersH, FaBolt, FaQuestionCircle, FaBalanceScale, FaComments, FaHome } from 'react-icons/fa';
import { getAllCompanyProducts } from '../api/thanos_api';

const Product = (props) => {
  // State variables for the screen
  const [isLoading, setIsLoading] = useState(true);
  const [tabSelected, setTabSelected] = useState(2);
  const [productSelected, setProductSelected] = useState();
  const [refresh, setRefresh] = useState(true);

  const [companyProducts, setCompanyProducts] = useState();

  // The useLocation hook
  const history = useHistory();

  const companyId = props.match.params.companyId;
  const productId = props.match.params.productId;
  // Fetches and sets the initial state of the screen depending on what is passed in from the URL search params;
  useEffect(() => {
    // This is going to fetch a product's data manually if this screen does not have it's state
    const fetchProductData = async () => {
      // const pathname = props.location.pathname;
      // const indexOfString = pathname.indexOf('product/');
      // if (indexOfString === -1) {
      //   history.push('/ErrorPage');
      // }
      // const stringToSearch = pathname.substring(indexOfString + 8);
      // const searchParams = new URLSearchParams(stringToSearch);
      // const objectSearchParams = Object.fromEntries(searchParams.entries());
      // const companyProductsFetch = await getProductsByCompany();
      // setCompanyProducts(companyProductsFetch.data.company_products);

      let NewCompanyProducts;
      if (!props.location.state || !props.location.state.companyProducts) {
        console.log('NEW REQUEST');
        const companyProductsFetched = await getAllCompanyProducts(companyId);
        NewCompanyProducts = companyProductsFetched.data.company_products;
      } else {
        NewCompanyProducts = props.location.state.companyProducts;
      }

      setCompanyProducts(NewCompanyProducts);

      if (!productId) {
        history.push('/ErrorPage');
      } else {
        const productInfo = NewCompanyProducts.find(
          (eachProduct) => eachProduct.Product_id === productId
        );
        if (productInfo === -1) {
          history.push('/ErrorPage');
        } else {
          setProductSelected(productInfo);
          setTabSelected(0);
        }
      }
      setIsLoading(false);
    };

    fetchProductData();
  }, []);

  if (!companyProducts || !productSelected) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <ReactLoading type='spin' color='#7779FC' height='3%' width='3%' />
      </div>
    );
  } else {
    // Constructs the tabs
    return (
      <DashboardSideBar
        productSelected={productSelected}
        onTabChange={(newTabIndex) => {
          setTabSelected(newTabIndex);
        }}
        currentTabSelected={tabSelected}
        tabs={[
          {
            title: 'Back to Company Products',
            image: <FaBoxOpen />,
            onPress: () => { history.push('/enterprise/' + companyId); }
          },
          {
            title: 'Analytics',
            image: <FaBoxOpen />,
            page: (
              <div>
                <div className='pb-10' />
                <div className='flex flex-row h3 mb-2 text-blue-pondr'>
                  Product Analytics
                </div>
                <AdvanceAnalytics
                  companyProducts={companyProducts}
                  productInfo={productSelected}
                  category={productSelected.Category}
                  productId={productSelected.Product_id}
                />
              </div>
            )
          },
          {
            title: 'Categorized Reviews',
            image: <FaRegChartBar />,
            page: (
              <CategoriesReviews
                productId={productSelected.Product_id}
                companyProducts={companyProducts}
                productInfo={productSelected}
                demo={false}
              />
            )
          },
          {
            title: 'AI Q&A',
            image: <FaBolt size={19} />,
            page: (
              <AIQuestions
                productInfo={productSelected}
                productId={productSelected.Product_id}
                companyProducts={companyProducts}
              />
            )
          },
          {
            title: 'Comparison Tool',
            image: <FaBalanceScale />,
            page: (
              <Compare
                productId={productSelected.Product_id}
                productInfo={productSelected}
                companyProducts={companyProducts}
                demo={false}
              />
            )
          }
        ]}
      />
    );
  }
};
export default withRouter(Product);
