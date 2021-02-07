import React, { useState } from 'react';
import Confirmation from 'images/confirmation.png';
import { updateInvite } from 'api/invites';

const EventInvite = props => {
  const [success, setSuccess] = useState(false);

  const updateEventInvite = async ({ userId, inviteId, eventId, status }) => {
    const response = await updateInvite({ userId, inviteId, eventId, status });
    setSuccess(response.success);
  };

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const inviteId = params.get('id');
  const eventId = params.get('eventId');
  const status = params.get('status');
  const { userId } = props.match.params;

  updateEventInvite(userId, inviteId, eventId, status);

  return (
    <div className='login-card-wrapper row'>
      <div className='col-md-4'>
        <div className={'card'}>
          <img
            className='card-img-top'
            src={Confirmation}
            alt='User activated'
          />
          <div className='card-body'>
            <h5 className='card-title'>{success ? 'Success' : 'Error'}</h5>
            <p className='card-text'>{success ? 'Your response has been recorded.' : 'An error occured.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInvite;
