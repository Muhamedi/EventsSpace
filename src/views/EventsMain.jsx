import React from "react";
import MainLayout from "components/Layout/MainLayout";
import EventCard from "components/EventCard/eventCard";

const EventsMain = () => (
  <MainLayout>
    <br/>
    <div className="row">
      <div className="col-md-3">
        <EventCard></EventCard>
      </div>
      <div className="col-md-3">
        <EventCard></EventCard>
      </div>
      <div className="col-md-3">
        <EventCard></EventCard>
      </div>
      <div className="col-md-3">
        <EventCard></EventCard>
      </div>
    </div>
  </MainLayout>
);

export default EventsMain;
