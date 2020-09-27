import React from 'react';
import PropTypes from 'prop-types';

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
          <button className='btn btn-info'>Details</button>
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
                Start time: {props.startDateTime}
              </small>
            </div>
            <div className='row'>
              <small className='text-muted'>
                Last updated 2 mins ago
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  eventType: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startDateTime: PropTypes.string.isRequired,
  //lastUpdated: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string,
};

export default EventCard;
