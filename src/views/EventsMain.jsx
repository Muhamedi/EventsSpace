import React, { useEffect, useState } from "react";
import { getEvents } from "api/Events";
import moment from "moment";
import MainLayout from "components/Layout/MainLayout";
import EventCard from "components/EventCard/EventCard";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import NoEvents from "images/NoEvents.png";
import { Formik } from "formik";
import * as Yup from 'yup';
import { ButtonTypes } from "constants/enums";
import { SpinnerTypes } from "constants/enums";

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

  const onCreateEvent = async (event, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log("EVENT:", event);
    setSubmitting(false);
    resetForm();
  };

  return (
    <MainLayout>
      <div className='row m-3'>
        <div className='col-md-3'>
          <Button
            text='Add new'
            type={ButtonTypes.INFO}
            onClick={toggleModalHandler}
            icon='fa fa-plus-square'
          />
        </div>
      </div>
      <div className='row m-3'>
        {events !== null &&
          events.map(event => (
            <div className='col-md-3' key={event._id}>
              <EventCard
                title={event.title}
                text={event.text}
                type={event.type}
                location={event.location}
                startDateTime={moment(event.startDateTime).format(
                  "HH:mm DD-MM-YYYY"
                )}
                lastUpdated='3'
                imgUrl={event.imgUrl}
                imgAlt={event.title}
              ></EventCard>
            </div>
          ))}
        {(events === null || events.length === 0) && (
          <div className='img-fluid w-100 h-100 text-center'>
            <img className='rounded' src={NoEvents} alt='No Events' />;
          </div>
        )}
      </div>
      <Formik
        initialValues={{
          title: "",
          participants: "fixed",
          nrOfTeams: 2,
          nrOfTeamPlayers: 5,
          location: "",
          startDateTime: moment().format("HH:mm DD-MM-YYYY"),
          customEventImage: "",
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Title is required"),
          participants: Yup.string().required("Participants are required"),
          nrOfTeams: Yup.number().required("Number of teams are required"),
          nrOfPlayers: Yup.number().required("Number of players are required"),
          location: Yup.string().required("Location is required"),
          startDateTime: Yup.string().required(
            "Start date and time is required"
          ),
        })}
        onSubmit={onCreateEvent}
      >
        {formikProps => {
          const {
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            isValid,
          } = formikProps;
          return (
            <Modal
              display={displayModal}
              primaryButtonText='Save'
              primaryButtonLoading={isSubmitting}
              primaryButtonClick={handleSubmit}
              primaryButtonSpinnerType={SpinnerTypes.LIGHT}
              primaryButtonDisabled={!isValid}
              secondaryButtonText='Cancel'
              secondaryButtonClick={toggleModalHandler}
              title='Create new event'
              toggleModal={toggleModalHandler}
            >
              <div className='form-group row'>
                <label htmlFor='title' className='col-sm-2'>
                  Title
                </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Event title'
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='title'
                    name='title'
                  />
                </div>
                {errors.title && touched.title && (
                  <p className='text-danger'>{errors.title}</p>
                )}
              </div>
              <div className='form-group row'>
                <label htmlFor='type' className='col-sm-2'>
                  Participants
                </label>
                <div className='col-sm-10'>
                  <select
                    value={values.participants}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='participants'
                    className='form-control'
                  >
                    <option value='fixed'>Fixed</option>
                    <option value='notfixed'>Not fixed</option>
                  </select>
                </div>
                {errors.participants && touched.participants && (
                  <p className='text-danger'>{errors.participants}</p>
                )}
              </div>
              <div className='form-group row'>
                <label htmlFor='type' className='col-sm-2'>
                  Nr. of teams
                </label>
                <div className='col-sm-10'>
                  <select
                    value={values.nrOfTeams}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='nrOfTeams'
                    className='form-control'
                  >
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                  </select>
                </div>
                {errors.nrOfTeams && touched.nrOfTeams && (
                  <p className='text-danger'>{errors.nrOfTeams}</p>
                )}
              </div>
              <div className='form-group row'>
                <label htmlFor='type' className='col-sm-2'>
                  Nr. of team players
                </label>
                <div className='col-sm-10'>
                  <select
                    value={values.nrOfTeamPlayers}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='nrOfTeamPlayers'
                    className='form-control'
                  >
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                  </select>
                </div>
                {errors.nrOfTeamPlayers && touched.nrOfTeamPlayers && (
                  <p className='text-danger'>{errors.nrOfTeamPlayers}</p>
                )}
              </div>
              <div className='form-group row'>
                <label htmlFor='type' className='col-sm-2'>
                  Type
                </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Event type'
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='type'
                    name='type'
                  />
                </div>
                {errors.type && touched.type && (
                  <p className='text-danger'>{errors.type}</p>
                )}
              </div>
              <div className='form-group row'>
                <label htmlFor='location' className='col-sm-2'>
                  Location
                </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Event location'
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='location'
                    name='location'
                  />
                </div>
                {errors.location && touched.location && (
                  <p className='text-danger'>{errors.location}</p>
                )}
              </div>
              <div className='form-group row'>
                <label htmlFor='startTime' className='col-sm-2'>
                  Start Time
                </label>
                <div className='col-sm-4'>
                  <input
                    type='time'
                    className='form-control'
                    value={values.startTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='startTime'
                    name='startTime'
                  />
                </div>
                {errors.startTime && touched.startTime && (
                  <p className='text-danger'>{errors.startTime}</p>
                )}
                <label htmlFor='startDate' className='col-sm-2'>
                  Start Date
                </label>
                <div className='col-sm-4'>
                  <input
                    type='date'
                    className='form-control'
                    value={values.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='startDate'
                    name='startDate'
                  />
                </div>
                {errors.startDate && touched.startDate && (
                  <p className='text-danger'>{errors.startDate}</p>
                )}
              </div>
            </Modal>
          );
        }}
      </Formik>
    </MainLayout>
  );
};

export default EventsMain;
