import React from "react";
import EventsMain from "views/Events/EventsMain";
import SignUp from "views/SignUp/SignUp";
import Login from "views/Login/Login";
import { Switch, Route } from "react-router-dom";

const Routes = (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/events" component={EventsMain} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
  </Switch>
);

export default Routes;
