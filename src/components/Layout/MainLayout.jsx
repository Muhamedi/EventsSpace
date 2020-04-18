import React from "react";
import NavBar from "components/NavBar/NavBar";
import Footer from "components/Footer/Footer";
import PropTypes from "prop-types";

const MainLayout = props => {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
};

MainLayout.propTypes = {
    children: PropTypes.node
}

export default MainLayout;
