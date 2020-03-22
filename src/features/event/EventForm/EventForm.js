import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

class EventForm extends Component {
  state = {
    title: '',
    date:'',
    city:'',
    venue:'',
    hostedBy:''
  };

  componentDidMount(){
    if(this.props.selectedEvent !== null){
      this.setState({...this.props.selectedEvent})
    }
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.id){
      this.props.updateEvent(this.state)
    }else{
      this.props.createEvent(this.state)
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
          <Button type='button' onClick={this.props.cancelFormOpen}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
