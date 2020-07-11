import React from "react";
import NavBar from "components/NavBar/NavBar";
import Footer from "components/Footer/Footer";
import PropTypes from "prop-types";
import styles from "./mainlayout.module.css";
import { isAuthenticated } from 'common/auth';
import { Redirect } from "react-router-dom";

const MainLayout = props => {
  if(!isAuthenticated()) {
    return <Redirect to="/login" />;
  }
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
