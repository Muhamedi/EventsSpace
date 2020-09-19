import React from "react";
import EventsMain from "views/EventsMain";
import SignUp from "views/SignUp";
import Login from "views/Login";
import UserActivated from "components/UserActivated";
import { Switch, Route } from "react-router-dom";

const Routes = (
  <Switch>
    <Route exact path="/" component={EventsMain} />
    <Route exact path="/events" component={EventsMain} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/users/:userId/activation" component={UserActivated} />
  </Switch>
);

export default Routes;
