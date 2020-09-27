import React, { useEffect, useState } from 'react';
import { getEvents, createNewEvent } from 'api/Events';
import { getParticipantTypes } from 'api/ParticipantTypes';
import { getEventTypes } from 'api/EventTypes';
import moment from 'moment';
import MainLayout from 'components/MainLayout';
import EventCard from 'components/EventCard';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Empty from 'images/empty.png';
import Select from 'components/Select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ButtonTypes, SpinnerTypes, HttpStatusCodes } from 'constants/enums';
import openSocket from 'socket.io-client';
import { APP_CONFIG } from 'config/axiosConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventsMain = () => {
  const [events, setEvents] = useState([]);
  const [participantTypes, setParticipantTypes] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);

  const socket = openSocket(APP_CONFIG.URL.eventsSpaceApiBasePath);
  socket.on('events', data => {
    if (data.action === 'create') {
      const newEvents = [...events, data.event];
      setEvents(newEvents);
    }
  });

  useEffect(() => {
    (async () => {
      const response = await getEvents();
      if (response.success) {
        setEvents(response.events);
      }
    })();
    (async () => {
      const response = await getParticipantTypes();
      if (response.success) {
        setParticipantTypes(response.participantTypes);
      }
    })();
    (async () => {
      const response = await getEventTypes();
      if (response.success) {
        setEventTypes(response.eventTypes);
      }
    })();
  }, []);

  const toggleModalHandler = () => {
    setDisplayModal(!displayModal);
  };

  const onCreateEvent = async (event, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await createNewEvent(event);
    if (response.status === HttpStatusCodes.CREATED) {
      toggleModalHandler();
    }
    setSubmitting(false);
    resetForm();
  };

  return (
    <MainLayout>
      <div className='row m-3'>
        <div className='col-md-3'>
          <Button
            text='Add new'
            className={ButtonTypes.INFO}
            onClick={toggleModalHandler}
            icon='fa fa-plus-square'
          />
        </div>
      </div>
      <div className='row m-3'>
        {events &&
          events.map(event => (
            <div className='col-md-3' key={event._id}>
              <EventCard
                title={event.title}
                text={event.text}
                participantsType={event.participantsType}
                nrOfTeams={event.nrOfTeams}
                nrOfTeamPlayers={event.nrOfTeamPlayers}
                eventType={event.eventType}
                location={event.location}
                startDateTime={moment(event.startDateTime).format(
                  'HH:mm DD-MM-YYYY'
                )}
                lastUpdated='3'
                imgUrl={event.imgUrl}
                imgAlt={event.title}
              ></EventCard>
            </div>
          ))}
        {(!events || !events.length) && (
          <div className='img-fluid w-100 h-100 text-center'>
            <img className='rounded' src={Empty} alt='No Events' />
          </div>
        )}
      </div>
      <Formik
        initialValues={{
          title: '',
          participantsType: '',
          nrOfTeams: 2,
          nrOfTeamPlayers: 5,
          eventType: '',
          location: '',
          startDateTime: moment().add(60, 'minute').toDate(),
          // customEventImage: '',
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Title is required'),
          participantsType: Yup.string().required('Participants are required'),
          nrOfTeams: Yup.string().required('Number of teams are required'),
          nrOfTeamPlayers: Yup.string().required(
            'Number of players are required'
          ),
          eventType: Yup.string().required('Event type is required'),
          location: Yup.string().required('Location is required'),
          startDateTime: Yup.string().required(
            'Start date and time is required'
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
            setFieldValue,
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
                <label htmlFor='title' className='col-sm-3'>
                  Title
                </label>
                <div className='col-sm-9'>
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
                <label htmlFor='type' className='col-sm-3'>
                  Participants Type
                </label>
                <div className='col-sm-9'>
                  <Select
                    value={values.participantsType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='participantsType'
                    textField='name'
                    valueField='_id'
                    items={participantTypes}
                  />
                </div>
                {errors.participantsType && touched.participantsType && (
                  <p className='text-danger'>{errors.participantsType}</p>
                )}
              </div>
              <div className='form-group row'>
                <label htmlFor='type' className='col-sm-3'>
                  Nr. of participants
                </label>
                <div className='col-sm-3'>
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
                <label htmlFor='type' className='col-sm-3'>
                  Nr. team players
                </label>
                <div className='col-sm-3'>
                  <select
                    value={values.nrOfTeamPlayers}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='nrOfTeamPlayers'
                    className='form-control'
                  >
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='6'>7</option>
                  </select>
                </div>
                {errors.nrOfTeamPlayers && touched.nrOfTeamPlayers && (
                  <p className='text-danger'>{errors.nrOfTeamPlayers}</p>
                )}
              </div>
              <div className='form-group row'>
                <label htmlFor='type' className='col-sm-3'>
                  Type
                </label>
                <div className='col-sm-9'>
                  <Select
                    value={values.eventType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='eventType'
                    textField='name'
                    valueField='_id'
                    items={eventTypes}
                  />
                </div>
                {errors.eventType && touched.eventType && (
                  <p className='text-danger'>{errors.eventType}</p>
                )}
              </div>
              <div className='form-group row'>
                <label htmlFor='location' className='col-sm-3'>
                  Location
                </label>
                <div className='col-sm-9'>
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
                <label htmlFor='startDateTime' className='col-sm-3'>
                  Start Date & Time
                </label>
                <div className='col-sm-9'>
                  <DatePicker
                    className='form-control'
                    selected={values.startDateTime}
                    showTimeSelect={true}
                    timeFormat='p'
                    timeIntervals={15}
                    dateFormat='Pp'
                    name='startDateTime'
                    onChange={value => setFieldValue('startDateTime', value)}
                  />
                </div>
                {errors.startDateTime && touched.startDateTime && (
                  <p className='text-danger'>{errors.startDateTime}</p>
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
