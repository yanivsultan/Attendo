import React, { Component } from "react";
import { connect } from 'react-redux'
import { Segment, Form, Button } from "semantic-ui-react";
import {createEvent, updateEvent} from '../eventActions'
import cuid from "cuid";


const mapState = (state,ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = { 
    title: '',
    date:'',
    city:'',
    venue:'',
    hostedBy:''
  }

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    event
  }
}

const actions = {
  createEvent,
  updateEvent
}

class EventForm extends Component {
  state = {...this.props.event};

  componentDidMount(){
    if(this.props.selectedEvent !== null){
      this.setState({...this.props.selectedEvent})
    }
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.id){
      this.props.updateEvent(this.state)
      this.props.history.push(`/events/${this.state.id}`)
    }else{
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      }
      this.props.createEvent(newEvent)
      this.props.history.push(`/events/${newEvent.id}`)
    }
  }

  handleInputs = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    return (
      <Segment>
        <Form>
          <Form.Field>
            <label>Event Title</label>
            <input
              name='title'
              value={this.state.title}
              onChange={this.handleInputs}
              placeholder='First Name'
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input name="date" value={this.state.date} onChange={this.handleInputs} type='date' placeholder='Event Date' />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name="city" value={this.state.city} onChange={this.handleInputs} placeholder='City event is taking place' />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name="venue" value={this.state.venue} onChange={this.handleInputs} placeholder='Enter the Venue of the event' />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name="hostedBy" value={this.state.hostedBy} onChange={this.handleInputs} placeholder='Enter the name of person hosting' />
          </Form.Field>
          <Button positive type='submit' onClick={this.handleFormSubmit}>
            Submit
          </Button>
          <Button type='button' onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(EventForm);
