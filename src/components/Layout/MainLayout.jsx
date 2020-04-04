import React from "react";
import NavBar from "components/NavBar/NavBar";
import Footer from "components/Footer/Footer";

const MainLayout = props => {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
};

export default MainLayout;
