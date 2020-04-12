import React from "react";
import MainLayout from "components/Layout/MainLayout";
import EventCard from "components/EventCard/eventCard";
import Button from "components/Button/button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const EventsMain = () => (
  <MainLayout>
    <div className="row m-3">
      <div className="col-md-3">
        <Button text="Add new">
          <AddCircleOutlineIcon />
        </Button>
      </div>
    </div>
    <div className="row m-3">
      <div className="col-md-3">
        <EventCard
          title="Football"
          text="Football match"
          type="Sport"
          location="Fusha Prishtina"
          lastUpdated="3"
          img="https://www.wallstickers-folies.co.uk/artpng-9661.png"
          imgAlt="Football"
        ></EventCard>
      </div>
      <div className="col-md-3">
        <EventCard
          title="Counter Strike"
          text="Counter Stike match"
          type="Computer gaming"
          location="Home"
          lastUpdated="7"
          img="https://i.dlpng.com/static/png/109064_preview.png"
          imgAlt="Counter Strike"
        ></EventCard>
      </div>
      <div className="col-md-3">
        <EventCard
          title="Voleyball"
          text="Voleyball match"
          type="Sport"
          location="Fusha SdiAsVet"
          lastUpdated="3"
          img="https://bulldogstore.cz/262-tm_large_default/samolepka-volejbal-10.jpg"
          imgAlt="Voleyball"
        ></EventCard>
      </div>
      <div className="col-md-3">
        <EventCard
          title="Chess"
          text="Chess game"
          type="Strategy"
          location="Location"
          lastUpdated="25"
          img="https://i.pinimg.com/originals/db/13/ee/db13ee17db1c9f24d8bfd6cf0ac1063c.png"
          imgAlt="Chess"
        ></EventCard>
      </div>
    </div>
  </MainLayout>
);

export default EventsMain;
