import React from "react";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

const EventCard = () => (
  <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-4 p-2 text-center">
        <img
          width="70"
          src="https://www.wallstickers-folies.co.uk/artpng-9661.png"
          className="card-img img-thumbnail"
          alt="..."
        />
        <button className="btn btn-info mt-2">Details</button>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Football</h5>
          <p className="card-text">
            Ndeshje futbolli qe do te mbahet ndermjet..
          </p>
          <p className="card-text">
            <div className="row">
              <small className="text-muted">Location: Fusha Prishtina</small><LocationOnOutlinedIcon />
            </div>
            <div className="row">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default EventCard;
