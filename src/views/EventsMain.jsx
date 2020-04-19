import React, { useEffect, useState } from "react";
import { getEvents } from "api/Events";
import moment from "moment";
import MainLayout from "components/Layout/MainLayout";
import EventCard from "components/EventCard/EventCard";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import { ButtonTypes } from "constants/enums";

const EventsMain = () => {
  const [events, setEvents] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    async function getAllEvents() {
      const events = await getEvents();
      setEvents(events);
    }
    getAllEvents();
  }, []);

  const toggleModalHandler = () => {
    setDisplayModal(!displayModal);
  };

  return (
    <MainLayout>
      <div className="row m-3">
        <div className="col-md-3">
          <Button
            text="Add new"
            type={ButtonTypes.INFO}
            onClick={toggleModalHandler}
            icon="fa fa-plus-square"
          />
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
      <Modal
        display={displayModal}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        secondaryButtonClick={toggleModalHandler}
        title="Create new event"
        toggleModal={toggleModalHandler}
      >
        <div className="form-group row">
          <label htmlFor="title" className="col-sm-2">
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Event title"
              id="title"
              name="title"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="text" className="col-sm-2">
            Text
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Event text"
              id="text"
              name="text"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="type" className="col-sm-2">
            Type
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Event type"
              id="type"
              name="type"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="image" className="col-sm-2">
            Image
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Event image"
              id="image"
              name="image"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="location" className="col-sm-2">
            Location
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Event location"
              id="location"
              name="location"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="startTime" className="col-sm-2">
            Start Time
          </label>
          <div className="col-sm-4">
            <input
              type="time"
              className="form-control"
              id="startTime"
              name="startTime"
            />
          </div>
          <label htmlFor="startDate" className="col-sm-2">
            Start Date
          </label>
          <div className="col-sm-4">
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
            />
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default EventsMain;
