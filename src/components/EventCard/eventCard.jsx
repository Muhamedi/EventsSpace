import React from "react";
import PropTypes from 'prop-types'; 
// import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const EventCard = props => (
  <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-4 p-2 text-center">
        <div className="split">
          <img
            width="70"
            src={props.img}
            className="card-img img-thumbnail"
            alt={props.imgAlt}
          />
        </div>
        <div className="split mt-2">
          <button className="btn btn-info">Details</button>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            {props.text}
          </p>
          <div className="card-text">
            <div className="row">
              <small className="text-muted">Type: {props.type}</small>
            </div>
            <div className="row">
              <small className="text-muted">Location: {props.location}</small>
              {/* <LocationOnOutlinedIcon /> should be added along with location functionality*/}
            </div>
            <div className="row">
              <small className="text-muted">Last updated {props.lastUpdated} mins ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

EventCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  location: PropTypes.string,
  lastUpdated: PropTypes.string,
  img: PropTypes.string,
  imgAlt: PropTypes.string
}

export default EventCard;
