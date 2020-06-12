import React from "react";
import EventsMain from "views/Events/EventsMain";
import SignUp from "views/SignUp/SignUp";
import { Switch, Route } from "react-router-dom";

const Routes = (
  <Switch>
    <Route exact path="/" component={SignUp} />
    <Route exact path="/events" component={EventsMain} />
  </Switch>
);

export default Routes;
