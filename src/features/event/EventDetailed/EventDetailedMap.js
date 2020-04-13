import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Icon, Segment } from 'semantic-ui-react';


const Marker = () => <Icon name="marker" size="big" color="red" />

const EventDetailedMap = ({lat, lng}) => {

      return (
          <Segment attached="bottom" style={{padding:0}}>
        <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBeDH7D6_eZW037rIDjS7o_RhMqp7U9B0E" }}
            defaultCenter={{lat,lng}}
            defaultZoom={14}
          >
            <Marker
              lat={lat}
              lng={lng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
        </Segment>
      );
    }

export default EventDetailedMap
