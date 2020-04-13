import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';

const AnyReactComponent = () => <Icon name="marker" size="big" color="red" />

class SimpleMap extends Component {

  render() {
      const {latlng} = this.props
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBeDH7D6_eZW037rIDjS7o_RhMqp7U9B0E" }}
          defaultCenter={latlng}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={latlng.lat}
            lng={latlng.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;



// import React, { Component } from "react";
// import GoogleMapReact from "google-map-react";
// import { Icon } from "semantic-ui-react";

// const AnyReactComponent = () => <Icon name='marker' size='big' color='red' />;

// class SimpleMap extends Component {


//   render() {
//     const { latlng } = this.props;
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: "300px", width: "100%" }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: "AIzaSyBeDH7D6_eZW037rIDjS7o_RhMqp7U9B0E" }}
//           defaultCenter={latlng}
//           defaultZoom={11}
//         >
//           <AnyReactComponent lat={latlng.lat} lng={latlng.lat} text='My Marker' />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default SimpleMap;
