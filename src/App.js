import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import './css/style.scss';
import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';
import UnprotectedRoute from './partials/UnprotectedRoute';
import ProtectedRoute from './partials/ProtectedRoute';
// Landing pages:

// User signed in components:
import SignIn from './pages/SignIn';
import AdminDashboard from './pages/AdminDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import Product from './pages/Product';

const App = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic'
    });
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
    focusHandling('outline');
  }, []);

  return (
    <Switch>
      <ProtectedRoute exact path='/'>
        <AdminDashboard />
      </ProtectedRoute>
      <ProtectedRoute exact path='/enterprise/:id'>
        <CompanyDashboard />
      </ProtectedRoute>
      <ProtectedRoute exact path='/enterprise/:companyId/product/:productId'>
        <Product />
      </ProtectedRoute>
      <UnprotectedRoute exact path='/signin'>
        <SignIn />
      </UnprotectedRoute>
    </Switch>
  );
};

export default App;
