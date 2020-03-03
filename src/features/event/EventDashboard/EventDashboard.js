import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventForm from '../EventForm/EventForm';
import EventList from '../EventList/EventList';
import cuid from 'cuid';


const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27T11:00:00+00:00',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28T14:00:00+00:00',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


class EventDashboard extends Component {
  state={
    events: events,
    isOpen: false
  }

  handleFormToggle = () =>{
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

handleCreateEvent = (newEvent) => {
  newEvent.id = cuid();
  newEvent.hostPhotoURL = '/assets/user.png'
  this.setState({
    events: [...this.state.events, newEvent],
    isOpen: false
  })
  console.log(this.state)
}

  render() {
    const events = this.state.events
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events}/>
        </Grid.Column>
        <Grid.Column width={6}>
        <Button positive content='Create Event' onClick={this.handleFormToggle}/>
        {this.state.isOpen ? <EventForm createEvent={this.handleCreateEvent} handleFormToggle={this.handleFormToggle}/> : null }
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;