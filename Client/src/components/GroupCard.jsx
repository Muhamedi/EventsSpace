import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const GroupCard = props => {
  return (
    <div className='card mb-3'>
      <div className='row no-gutters'>
        <div className='col-md-4 p-2 text-center'>
          <div className='split'>
            <img
              width='70'
              src='https://www.logolynx.com/images/logolynx/b5/b5e6c595e4c915f3ce0e3e7a50fa68d0.jpeg'
              className='card-img img-thumbnail'
              alt='Group image'
            />
          </div>
          <div className='split mt-2'>
            <Link className='btn btn-info' to={`events/${props.id}/details`}>
              Details
            </Link>
          </div>
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>{/*props.name*/}Grupi miq</h5>
            <p className='card-text'>{/*props.description*/}Texti miq</p>
            <div className='card-text'>
              <div className='ml-0 row'>
                <small className='text-muted'>
                  Created time:{' '}
                  {/* {moment(props.createdAt).format('HH:mm DD/MM/YYYY')} */}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type='button'
        className='close card-close-icon'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

export default GroupCard;