/*global google*/
import React, { Component } from "react";
import cuid from "cuid";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {
  combineValidators,
  isRequired,
} from "revalidate";
import TextInputs from "../../../app/common/form/TextInputs";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const validate = combineValidators({
  title: isRequired({ message: "The event title is required." }),
  category: isRequired({ message: "The category is required." }),
  description: isRequired({ message: "The description is required." }),
  city: isRequired({ message: "The city is required." }),
  venue: isRequired('venue'),
  date: isRequired('date')

});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
  state = { cityLatLng: {}, venueLatLng: {} };

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({ ...this.props.selectedEvent });
    }
  }

  onFormSubmit = values => {
    values.venueLagLng = this.state.venueLatLng
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  handleInputs = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
    .then(results => getLatLng(results[0]))
    .then(latlng => {
      this.setState({cityLatLng: latlng})
    })
    .then(()=>{
      this.props.change('city', selectedCity)
    })
  }

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
    .then(results => getLatLng(results[0]))
    .then(latlng => {
      this.setState({venueLatLng: latlng})
    })
    .then(()=>{
      this.props.change('city', selectedVenue)
    })
  }
  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event details' />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInputs}
                placeholder='Give your event a name'
              />
              <Field
                name='category'
                component={SelectInput}
                options={category}
                placeholder='What`s your event about'
              />
              <Field
                name='description'
                component={TextArea}
                rows={3}
                placeholder='Tell us about your event'
              />
              <Header sub color='teal' content='Event location details' />
              <Field
                name='city'
                component={PlaceInput}
                options={{types: ['(cities)']}}
                onSelect={this.handleCitySelect}
                placeholder='Event city'
              />
              <Field
                name='venue'
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                onSelect={this.handleVenueSelect}
                placeholder='Event venue'
              />
              <Field
                name='date'
                component={DateInput}
                dateFormat='dd LLL yyyy h:mm a'
                showTimeSelect
                timeFormat='HH:mm'
                placeholder='Event date'
              />

              <Button disabled={this.props.invalid || this.props.submitting || this.props.pristine} positive type='submit'>Submit</Button>
              <Button
                type='button'
                onClick={
                  this.props.initialValues.id
                    ? () =>
                        this.props.history.push(
                          `/events/${this.props.initialValues.id}`
                        )
                    : () => this.props.history.push("/events")
                }
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'eventform', validate })(EventForm));
