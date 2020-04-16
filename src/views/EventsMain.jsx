import React, { useEffect, useState } from "react";
import { getEvents } from "api/Events";
import moment from "moment";
import MainLayout from "components/Layout/MainLayout";
import EventCard from "components/EventCard/eventCard";
import Button from "components/Button/button";

const EventsMain = () => {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    async function getAllEvents() {
      const events = await getEvents();
      setEvents(events);
    }
    getAllEvents();
  }, []);

  return (
    <MainLayout>
      <div className="row m-3">
        <div className="col-md-3">
          <Button text="Add new" icon="fa fa-plus-square" />
        </div>
      </div>
      <div className="row m-3">
        {events !== null &&
          events.map((event) => (
            <div className="col-md-3" key={event._id}>
              <EventCard
                title={event.title}
                text={event.text}
                type={event.type}
                location={event.location}
                startDateTime={moment(event.startDateTime).format(
                  "HH:mm DD-MM-YYYY"
                )}
                lastUpdated="3"
                imgUrl={event.imgUrl}
                imgAlt={event.title}
              ></EventCard>
            </div>
          ))}
        {(events === null || events.length === 0) && (
          <div className="alert alert-info">No upcomming events</div> //should be replaced with empty state photo
        )}
      </div>
    </MainLayout>
  );
};

export default EventsMain;
