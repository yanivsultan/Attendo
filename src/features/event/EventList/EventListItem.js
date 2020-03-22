import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

class EventListItem extends Component {
  render() {
    const event = this.props.event
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                size='tiny'
                circular
                src={event.hostPhotoURL}
              />
              <Item.Content>
                <Item.Header >{event.title}</Item.Header>
                <Item.Description>
                  Hosted by {event.hostedBy}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {event.date} |
            <Icon name='marker' /> {event.time}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees ? event.attendees.map(attendee => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
            )) : null}

          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button onClick={() => this.props.selectEvent(event)} as='a' color='teal' floated='right' content='View' />
          <Button onClick={() => this.props.deleteEvent(event.id)} as='a' color='red' floated='right' content='Delete' />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
