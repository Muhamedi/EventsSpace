import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const GoogleMapContainer = () => {
  return (
    <Map google={'this.props.google'} zoom={14}>
      <Marker /*onClick={this.onMarkerClick}*/ name={'Current location'} />
      <InfoWindow /*onClose={this.onInfoWindowClose}*/>
        <div>
          <h1>{'Test name'}</h1>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAX4MHUf7IhRwZ9ci6UCwk09gt3IkIAjNs',
})(GoogleMapContainer);
