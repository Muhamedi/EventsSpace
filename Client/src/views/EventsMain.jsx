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
import { ParticipantTypes } from 'constants/enums';
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

  const fetchEvents = async () => {
    const response = await getEvents();
    if (response.success) {
      setEvents(response.events);
    }
  };

  const fetchParticipantTypes = async () => {
    const response = await getParticipantTypes();
    if (response.success) {
      setParticipantTypes(response.participantTypes);
    }
  };

  const fetchEventTypes = async () => {
    const response = await getEventTypes();
    if (response.success) {
      setEventTypes(response.eventTypes);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchParticipantTypes();
    fetchEventTypes();
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
                id = {event._id}
                title={event.title}
                text={event.text}
                eventType={event.eventType.name}
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
          nrOfParticipants: 5,
          inviteAll: false,
          eventType: '',
          location: '',
          startDateTime: moment().add(1, 'day').toDate(),
          // customEventImage: '',
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Title is required'),
          participantsType: Yup.string().required('Participants are required'),
          nrOfParticipants: Yup.string().required(
            'Number of participants are required'
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
          console.log('props:', formikProps);
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
                  {errors.title && touched.title && (
                    <span className='text-danger'>{errors.title}</span>
                  )}
                </div>
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
                  {errors.participantsType && touched.participantsType && (
                    <span className='text-danger'>
                      {errors.participantsType}
                    </span>
                  )}
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='type' className='col-sm-3'>
                  Nr. of participants
                </label>
                <div className='col-sm-3'>
                  <select
                    value={values.nrOfParticipants}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='nrOfParticipants'
                    className='form-control'
                  >
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                  </select>
                  {errors.nrOfParticipants && touched.nrOfParticipants && (
                    <span className='text-danger'>
                      {errors.nrOfParticipants}
                    </span>
                  )}
                </div>
              </div>
              {values.participantsType === ParticipantTypes.TEAM.toString() && (
                <div className='form-group row'>
                  <label htmlFor='type' className='col-sm-3'>
                    Nr. team players
                  </label>
                  <div className='col-sm-3'>
                    <select
                      value={values.nrOfParticipants}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='nrOfParticipants'
                      className='form-control'
                    >
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='6'>7</option>
                    </select>
                    {errors.nrOfParticipants && touched.nrOfParticipants && (
                      <span className='text-danger'>
                        {errors.nrOfParticipants}
                      </span>
                    )}
                  </div>
                </div>
              )}
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
                  {errors.eventType && touched.eventType && (
                    <span className='text-danger'>{errors.eventType}</span>
                  )}
                </div>
              </div>
              <div className='form-group row'>
                <div className='offset-sm-3 col-sm-9'>
                  <input
                    type='checkbox'
                    value={values.inviteAll}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='inviteAll'
                    name='inviteAll'
                    className='mr-1'
                  />
                  <span>Invite all users</span>
                </div>
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
                  {errors.location && touched.location && (
                    <span className='text-danger'>{errors.location}</span>
                  )}
                </div>
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
                  {errors.startDateTime && touched.startDateTime && (
                    <span className='text-danger'>{errors.startDateTime}</span>
                  )}
                </div>
              </div>
            </Modal>
          );
        }}
      </Formik>
    </MainLayout>
  );
};

export default EventsMain;
