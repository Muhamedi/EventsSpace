import React from 'react';
import Confirmation from 'images/confirmation.png';
import { useParams } from "react-router-dom";

const EventInvite = () => {
    const { id, eventId, status } = useParams();
    console.log({eventId});
    return  (
        <div className='login-card-wrapper row'>
        <div className='col-md-4'>
        <div className={'card'}>
          <img
            className='card-img-top'
            src={Confirmation}
            alt='User activated'
          />
          <div className='card-body'>
            <h5 className='card-title'>Success</h5>
            <p className='card-text'>
              Your response has been recorded.
            </p>
          </div>
        </div>
        </div>
      </div>
    );
}

export default EventInvite;