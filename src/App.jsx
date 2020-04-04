import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes/routes";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        {Routes}
      </BrowserRouter>
    </>
  );
};

export default App;
