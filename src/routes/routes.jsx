import React from "react";
import EventsMain from "views/EventsMain";
import { Switch, Route } from "react-router-dom";

const Routes = (
  <Switch>
    <Route exact path="/" component={EventsMain} />
  </Switch>
);

export default Routes;
