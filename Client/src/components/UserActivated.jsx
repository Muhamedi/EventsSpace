import React, { useEffect, useState } from 'react';
import Alert from 'components/Alert';
import Confirmation from 'images/confirmation.png';
import Loader from 'components/Loader';
import { activateUser } from 'api/Users';
// import PropTypes from 'prop-types';

const UserActivated = props => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const activationId = params.get('id');
  const email = params.get('email');
  // eslint-disable-next-line react/prop-types
  const { userId } = props.match.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const activate = async () => {
      try {
        const response = await activateUser(userId, email, activationId);
        if (response.success) {
          setLoading(false);
        }
      } catch (ex) {
        setError(ex.data.message);
      } finally {
        setLoading(false);
      }
    };
    activate();
  }, []);

  return (
    <div className='col-md-4 offset-md-4 h-100'>
      {loading && <Loader />}
      {!loading && (
        <div className={'card'}>
          <Alert
            display={error}
            alertType='alert-danger'
            onClose={() => setError(null)}
            text={error}
          />
          <img
            className='card-img-top'
            src={Confirmation}
            alt='User activated'
          />
          <div className='card-body'>
            <h5 className='card-title'>Success</h5>
            <p className='card-text'>User has been successfully activated</p>
            <a href='/login' className='btn btn-primary'>
              Continue to login
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// UserActivated.propTypes = {
//     text: PropTypes.string.isRequired,
// };

export default UserActivated;
