import React, { useState, useEffect } from 'react';
import Confirmation from 'images/confirmation.png';
import Failed from 'images/failed.png';
import Loader from 'components/Loader';
import { SpinnerTypes } from 'constants/enums';
import { updateInvite } from 'api/Invites';

const EventInvite = props => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const updateEventInvite = async ({ userId, inviteId, eventId, status }) => {
    try {
      const response = await updateInvite({
        userId,
        inviteId,
        eventId,
        status,
      });
      setSuccess(response.success);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const inviteId = params.get('id');
    const eventId = params.get('eventId');
    const status = params.get('status');
    const { userId } = props.match.params;
    updateEventInvite({ userId, inviteId, eventId, status });
  }, [props.match.params]);

  return (
    <div className='login-card-wrapper row'>
      {isLoading && <Loader type={SpinnerTypes.PRIMARY} />}
      {!isLoading && (
        <div className='col-md-4'>
          <div className={'card'}>
            <img
              className='card-img-top'
              src={success ? Confirmation : Failed}
              alt='User activated'
            />
            <div className='card-body'>
              <h5 className='card-title'>{success ? 'Success' : 'Error'}</h5>
              <p className='card-text'>
                {success
                  ? 'Your response has been recorded.'
                  : 'Invitation is not found or invalid.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInvite;
