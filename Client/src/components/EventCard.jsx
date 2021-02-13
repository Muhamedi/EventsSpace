import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const EventCard = props => (
  <div className='card mb-3'>
    <div className='row no-gutters'>
      <div className='col-md-4 p-2 text-center'>
        <div className='split'>
          <img
            width='70'
            src={props.imgUrl}
            className='card-img img-thumbnail'
            alt={props.imgAlt}
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
          <h5 className='card-title'>{props.title}</h5>
          <p className='card-text'>{props.title}</p>
          <div className='card-text'>
            <div className='row'>
              <small className='text-muted'>Type: {props.eventType}</small>
            </div>
            <div className='row'>
              <small className='text-muted'>Location: {props.location}</small>
            </div>
            <div className='row'>
              <small className='text-muted'>
                Start time:{' '}
                {moment(props.startDateTime).format('HH:mm DD/MM/YYYY')}
              </small>
            </div>
            <div className='row'>
              <small className='text-muted'>
                Last updated: {' '}
                {moment(props.lastUpdatedAt).fromNow()}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button type='button' className='close card-close-icon' aria-label='Close'>
      <span aria-hidden='true'>&times;</span>
    </button>
  </div>
);

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  eventType: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startDateTime: PropTypes.string.isRequired,
  lastUpdatedAt: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string,
};

export default EventCard;
