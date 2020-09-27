import React from 'react';
import Confirmation from 'images/confirmation.png';
import Failed from 'images/failed.png';

const UserActivated = props => {
  // eslint-disable-next-line react/prop-types
  if (!props.location.state || !props.location.state.success) {
    return (
      <div className='login-card-wrapper row'>
        <div className='col-md-4'>
        <div className={'card'}>
          <img
            className='card-img-top'
            src={Failed}
            alt='User activated'
          />
          <div className='card-body'>
            <h5 className='card-title'>Invalid</h5>
            <p className='card-text'>
              Link is invalid
            </p>
          </div>
        </div>
        </div>
      </div>
    );
  }
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
            <h5 className='card-title'>Success</h5>
            <p className='card-text'>User has been successfully created.</p>
            <p className='card-text'>
              An activation email has been sent to your inbox.
            </p>
            <p className='card-text'>
              Please click on the activation link to activate the user on our
              platform.
            </p>
            <a href='/login' className='btn btn-primary'>
                Continue to login
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivated;
