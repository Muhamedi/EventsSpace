import React from "react";
import EventsMain from "views/EventsMain";
import SignUp from "views/SignUp";
import Login from "views/Login";
import UserActivated from "views/UserActivated";
import UserCreated from "views/UserCreated";
import EventInvite from "views/EventInvite";
import EventDetails from "components/EventDetails";
import { Switch, Route } from "react-router-dom";

const Routes = (
  <Switch>
    <Route exact path="/" component={EventsMain} />
    <Route exact path="/events" component={EventsMain} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/users/:userId/activation" component={UserActivated} />
    <Route exact path="/user/created" component={UserCreated} />
    <Route exact path="/users/:userId/invitation" component={EventInvite} />
    <Route exact path="/events/:eventId/details" component={EventDetails} />
  </Switch>
);

export default Routes;
