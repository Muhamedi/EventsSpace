import React from 'react';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import PropTypes from 'prop-types';
import { isAuthenticated } from 'common/auth';
import { Redirect } from 'react-router-dom';

const MainLayout = props => {
  if (!isAuthenticated()) {
    return <Redirect to='/login' />;
  }
  return (
    <>
      <NavBar />
      <div>{props.children}</div>
      <Footer />
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
