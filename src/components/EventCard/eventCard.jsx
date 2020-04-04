import React from "react";
// import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const EventCard = () => (
  <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-4 p-2 text-center">
        <div className="split">
          <img
            width="70"
            src="https://www.wallstickers-folies.co.uk/artpng-9661.png"
            className="card-img img-thumbnail"
            alt="Dummy text"
          />
        </div>
        <div className="split mt-2">
          <button className="btn btn-info">Details</button>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Football</h5>
          <p className="card-text">
            Ndeshje futbolli qe do te mbahet ndermjet..
          </p>
          <p className="card-text">
            <div className="row">
              <small className="text-muted">Type: Sport</small>
            </div>
            <div className="row">
              <small className="text-muted">Location: Fusha Prishtina</small>
              {/* <LocationOnOutlinedIcon /> should be added along with location functionality*/}
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
