import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";

class EventListAttendee extends Component {
  render() {
    const attendee = this.props.attendee
    return (
      <List.Item>
        <Image
          as='a'
          size='mini'
          src={attendee.photoURL}
        />
      </List.Item>
    );
  }
}

export default EventListAttendee;
