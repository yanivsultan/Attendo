import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventForm from "../EventForm/EventForm";
import EventList from "../EventList/EventList";
import cuid from "cuid";
import { connect } from 'react-redux'

const mapState = (state) => ({
  events: state.events
})

class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null
  };

  // handleFormToggle = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // };

  handleCreateFormOpen = () =>{
    this.setState({isOpen: true,
    selectedEvent: null})
  }

  handleFormCancel = () => {
    this.setState({isOpen: false})
  }

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.setState({
      events: [...this.state.events, newEvent],
      isOpen: false,
      selectedEvent: null
    });
  };

  handleSelectEvent = event => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    });
  };

  handleUpdateEvent = updatedEvent => {
    this.setState(({ events }) => ({
      events: events.map(event => {
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent };
        } else {
          return event;
        }
      }),
      isOpen:false,
      selectedEvent:null
    }));
  };


  handleDeleteEvent = (id) => {
    this.setState(({events})=>({
      events: events.filter(e=> e.id !== id)
    }))
  }
  render() {
    const { events } = this.props;
    const selectedEvent = this.state.selectedEvent;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} events={events} selectEvent={this.handleSelectEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content='Create Event'
            onClick={this.handleCreateFormOpen}
          />
          {this.state.isOpen ? (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              updateEvent={this.handleUpdateEvent}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleFormCancel}
              selectedEvent={selectedEvent}
            />
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState)(EventDashboard);
