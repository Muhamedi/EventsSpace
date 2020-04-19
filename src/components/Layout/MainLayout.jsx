import React from "react";
import NavBar from "components/NavBar/NavBar";
import Footer from "components/Footer/Footer";
import PropTypes from "prop-types";
import styles from './mainlayout.module.css';

const MainLayout = (props) => {
  return (
    <>
      <NavBar />
      <div className={styles.mainBody}>{props.children}</div>
      <Footer />
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
