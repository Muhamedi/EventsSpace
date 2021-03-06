import React, { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import Alert from 'components/Alert';
import Button from 'components/Button';
import MainLayout from 'components/MainLayout';
import {
  SpinnerTypes,
  ParticipantTypes,
  ParticipantStatus,
  ColorTypes,
  Colors,
} from 'constants/enums';
import { getEventDetails } from 'api/Events';
import {
  getMyEventStatus,
  updateMyEventStatus,
  getEventTeamParticipants,
  initEventTeamParticipants,
  clearEventTeamParticipants,
} from 'api/EventParticipants';
import { getUserId } from 'common/auth';
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EventDetails = props => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [isClearLoading, setIsClearLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  const [myEventStatus, setMyEventStatus] = useState(null);
  const [isTeamsView, setTeamsView] = useState(false);
  const [blackTeamMembers, setBlackTeamMembers] = useState([]);
  const [whiteTeamMembers, setWhiteTeamMembers] = useState([]);

  const userId = getUserId();
  const { eventId } = props.match.params;

  const fetchEventDetails = async () => {
    const eventResponse = await getEventDetails(eventId);
    if (eventResponse.error) {
      setError(eventResponse.error);
      setIsLoading(false);
      return;
    }
    setEventDetails(eventResponse.eventDetails);
    const myStatusResponse = await getMyEventStatus(eventId, userId);
    if (myStatusResponse.error) {
      setError(myStatusResponse.error.message);
      setIsLoading(false);
      return;
    }
    setMyEventStatus(myStatusResponse.status);
    setIsLoading(false);
  };

  const updateMyStatus = async status => {
    const response = await updateMyEventStatus(eventId, userId, status._id);
    if (response.error) {
      setError(response.error);
      return;
    }
    setMyEventStatus(status);
    fetchEventDetails(); // Can be optimized, just add your userInfo as item
  };

  const getTeamParticipants = async eventId => {
    const response = await getEventTeamParticipants(eventId);
    if (response.error) {
      setError(response.error);
      return;
    }
    if (response.teams && response.teams.length) {
      const blackTeam = response.teams.find(
        x => x.team.color.toLowerCase() === Colors.BLACK
      );

      const whiteTeam = response.teams.find(
        x => x.team.color.toLowerCase() === Colors.WHITE
      );
      blackTeam && setBlackTeamMembers(blackTeam.members);
      whiteTeam && setWhiteTeamMembers(whiteTeam.members);
    }
  };

  useEffect(() => {
    fetchEventDetails(eventId);
    getTeamParticipants(eventId);
  }, []);

  const getStatusColor = (status, index, nrOfParticipants) => {
    const totalParticipants = nrOfParticipants * 2;
    if (index > totalParticipants) return ColorTypes.DANGER;
    switch (status) {
      case ParticipantStatus.IN:
        return ColorTypes.SUCCESS;
      case ParticipantStatus.OUT:
        return ColorTypes.DANGER;
      case ParticipantStatus.NOT_SURE:
        return ColorTypes.SECONDARY;
      default:
        return '';
    }
  };

  const initTeams = async () => {
    setIsInitLoading(true);
    await initEventTeamParticipants(eventId);
    await getTeamParticipants(eventId); // Get members from init request
    setIsInitLoading(false);
  };

  const clearTeams = async () => {
    setIsClearLoading(true);
    await clearEventTeamParticipants(eventId);
    setBlackTeamMembers([]);
    setWhiteTeamMembers([]);
    setIsClearLoading(false);
  };

  const onDragEnd = data => {
    // if (!data.destination) return;
    console.log({ data });
  };
  return (
    <MainLayout>
      <div className=''>
        <br />
        <Alert
          display={error}
          alertType='alert-danger'
          onClose={() => setError(null)}
          text={error || 'An error has occurred'}
        />
        {isLoading && (
          <div className='col-md-2 justify-content-center offset-md-5'>
            {' '}
            <Loader type={SpinnerTypes.PRIMARY} />{' '}
          </div>
        )}
        {!isLoading && (
          <>
            <div className='row form-group'>
              <div className='col-md-3 offset-md-2'>
                <h5 className='float-right'>Your status:</h5>
              </div>
              <div className='col-md-3'>
                <Button
                  className={`btn btn-outline-success ${
                    myEventStatus?._id === ParticipantStatus.IN && 'active'
                  }`}
                  type={SpinnerTypes.LIGHT}
                  text='IN'
                  onClick={() =>
                    updateMyStatus({ _id: ParticipantStatus.IN, name: 'IN' })
                  }
                />
                <Button
                  className={`btn btn-outline-danger ml-2 ${
                    myEventStatus?._id === ParticipantStatus.OUT && 'active'
                  }`}
                  type={SpinnerTypes.LIGHT}
                  text='OUT'
                  onClick={() =>
                    updateMyStatus({ _id: ParticipantStatus.OUT, name: 'OUT' })
                  }
                />
                <Button
                  className={`btn btn-outline-secondary ml-2 ${
                    myEventStatus?._id === ParticipantStatus.NOT_SURE &&
                    'active'
                  }`}
                  type={SpinnerTypes.LIGHT}
                  text='NOT SURE'
                  onClick={() =>
                    updateMyStatus({
                      _id: ParticipantStatus.NOT_SURE,
                      name: 'NOT SURE',
                    })
                  }
                />
              </div>
              <div className='col-md-3'>
                <Button
                  className='btn btn-secondary float-right'
                  type={SpinnerTypes.LIGHT}
                  text={isTeamsView ? 'View Details' : 'View teams'}
                  onClick={() => setTeamsView(isTeamsView => !isTeamsView)}
                />
              </div>
            </div>
            {isTeamsView && (
              <>
                <div className='row'>
                  <div className='col-md-5 offset-md-1'>
                    <div className='card'>
                      <div className='card-header'>Team White</div>
                      <div className='card-body bg-light'>
                        <DragDropContext onDragEnd={onDragEnd}>
                          <Droppable droppableId='droppable1'>
                            {(provided, snapshot) => (
                              <ul
                                style={{ padding: '0' }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {whiteTeamMembers.length === 0 && (
                                  <li className='list-group-item'>
                                    There are no team members yet
                                  </li>
                                )}
                                {whiteTeamMembers &&
                                  whiteTeamMembers.length > 0 &&
                                  whiteTeamMembers.map((member, index) => (
                                    <Draggable
                                      key={member._id}
                                      draggableId={member._id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <li
                                          className='list-group-item'
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          {member.firstName} {member.lastName}
                                        </li>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </ul>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-5'>
                    <div className='card'>
                      <div className='card-header'>Team Black</div>
                      <div className='card-body bg-light'>
                        <DragDropContext>
                          <Droppable droppableId='droppable2'>
                            {(provided, snapshot) => (
                              <ul
                                style={{ padding: '0' }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {blackTeamMembers.length === 0 && (
                                  <li className='list-group-item text-white bg-dark'>
                                    There are no team members yet
                                  </li>
                                )}
                                {blackTeamMembers &&
                                  blackTeamMembers.length > 0 &&
                                  blackTeamMembers.map((member, index) => (
                                    <Draggable
                                      key={member._id}
                                      draggableId={member._id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <li
                                          className='list-group-item text-white bg-dark'
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          {member.firstName} {member.lastName}
                                        </li>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </ul>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center mt-2'>
                  <Button
                    className='mr-1 btn btn btn-success'
                    type={SpinnerTypes.LIGHT}
                    text='Save'
                    onClick={() => {}}
                  />
                  <Button
                    className='ml-1 mr-1 btn btn btn-danger'
                    type={SpinnerTypes.LIGHT}
                    text='Clear'
                    loading={isClearLoading}
                    onClick={clearTeams}
                  />
                  <Button
                    className='ml-1 btn btn btn-secondary'
                    type={SpinnerTypes.LIGHT}
                    text='Init'
                    loading={isInitLoading}
                    onClick={initTeams}
                  />
                </div>
              </>
            )}
            {!isTeamsView && (
              <div className='row'>
                <div className='col-md-4 offset-md-1'>
                  <div className='card'>
                    <div className='card-header'>
                      <div className='card-body bg-light'>
                        <h4>
                          {eventDetails?.event?.title}{' '}
                          <img
                            width='50'
                            height='50'
                            className='card-img-right img-responsive img-thumbnail pull-right'
                            src={eventDetails?.event?.imgUrl}
                            alt='Event image'
                          />
                        </h4>
                      </div>
                    </div>
                    <ul className='list-group'>
                      <li className='list-group-item'>
                        <label className='mr-3'>Participants type:</label>
                        <strong>
                          {eventDetails?.event?.participantsType.name}
                        </strong>
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
                          {moment(eventDetails?.event?.startDateTime).format(
                            'HH:mm DD-MM-YYYY'
                          )}
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-6 mr-2'>
                  <div className='card'>
                    <div className='card-header'>
                      <h4>Participants</h4>
                    </div>
                    <div className='card-body bg-light'>
                      <ul style={{ padding: '0' }}>
                        {eventDetails?.participants.length === 0 && (
                          <li className='list-group-item list-group-item-light'>
                            There are no participants yet
                          </li>
                        )}
                        {eventDetails?.participants.length > 0 &&
                          eventDetails?.participants.map(
                            (participant, index) => (
                              <li
                                className={`list-group-item list-group-item-${getStatusColor(
                                  participant.status._id,
                                  index,
                                  eventDetails.event.nrOfParticipants
                                )}`}
                                key={participant._id}
                              >
                                {`${participant.user.firstName} ${participant.user.lastName}`}
                                <span className='ml-5'>
                                  {participant.status.name.toUpperCase()}
                                </span>

                                <span className='ml-5'>
                                  {moment(participant.createdAt).format(
                                    'HH:mm DD/MM/YYYY'
                                  )}
                                </span>
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default EventDetails;
