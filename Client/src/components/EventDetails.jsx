import React, { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import Alert from 'components/Alert';
import MainLayout from 'components/MainLayout';
import {
  SpinnerTypes,
  ParticipantTypes,
  ParticipantStatus,
  ColorTypes,
} from 'constants/enums';
import { getEventDetails } from 'api/Events';
import moment from 'moment';

const EventDetails = props => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState(null);

  const fetchEventDetails = async eventId => {
    const response = await getEventDetails(eventId);
    if (response.error) {
      setError(response.error);
      return;
    }
    setEventDetails(response.eventDetails);
    setIsLoading(false);
  };

  useEffect(() => {
    const { eventId } = props.match.params;
    fetchEventDetails(eventId);
  }, []);

  const getStatusColor = status => {
    switch (status) {
      case ParticipantStatus.IN:
        return ColorTypes.SUCCESS;
      case ParticipantStatus.OUT:
        return ColorTypes.DANGER;
      case ParticipantStatus.MAYBE:
        return ColorTypes.SECONDARY;
      default:
        return '';
    }
  };

  return (
    <MainLayout>
      <div className=''>
        <br />
        <Alert
          display={error}
          alertType='alert-danger'
          onClose={() => setError(null)}
          text={error}
        />
        {isLoading && <Loader type={SpinnerTypes.PRIMARY} />}
        {!isLoading && (
          <div className='row'>
            <div className='col-md-5 offset-md-1'>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <h4>
                    {eventDetails?.event?.title}{' '}
                    <img
                      width='50'
                      height='50'
                      className='img-responsive pull-right'
                      src={eventDetails?.event?.imgUrl}
                      alt='Event image'
                    />
                  </h4>
                </li>
                <li className='list-group-item'>
                  <label className='mr-3'>Participants type:</label>
                  <strong>{eventDetails?.event?.participantsType.name}</strong>
                </li>
                <li className='list-group-item'>
                  <label className='mr-3'>Event type:</label>
                  <strong>{eventDetails?.event?.eventType.name}</strong>
                </li>
                <li className='list-group-item'>
                  <label className='mr-3'>
                    Number of participants
                    {eventDetails?.event?.participantsType._id ===
                      ParticipantTypes.TEAM && ' per team'}
                    {':'}
                  </label>
                  <strong>{eventDetails?.event?.nrOfParticipants}</strong>
                </li>
                <li className='list-group-item'>
                  <label className='mr-3'>Created By:</label>
                  <strong>{eventDetails?.event?.createdBy.email}</strong>
                </li>
                <li className='list-group-item'>
                  <label className='mr-3'>Location:</label>
                  <strong>{eventDetails?.event?.location}</strong>
                </li>
                <li className='list-group-item'>
                  <label className='mr-3'>Start time:</label>
                  <strong>
                    {moment(eventDetails?.event?.startDatTime).format(
                      'HH:mm DD-MM-YYYY'
                    )}
                  </strong>
                </li>
              </ul>
            </div>
            <div className='col-md-5 mr-2'>
              <li className='list-group-item'>
                <h4>Participants</h4>
              </li>
              <li className='list-group-item'>
                <ul>
                  {eventDetails?.participants.map(participant => (
                    <li
                      className={`list-group-item list-group-item-${getStatusColor(
                        participant.status._id
                      )}`}
                      key={participant._id}
                    >
                      {participant.user.email}
                      <span className='ml-5 float-right'>{participant.status.name.toUpperCase()}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default EventDetails;
