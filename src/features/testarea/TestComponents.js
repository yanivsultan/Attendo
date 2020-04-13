import React, { Component } from 'react';
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './testActions'
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './simpleMap';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import PlaceInput from '../../app/common/form/PlaceInput';

const mapState = (state) => ({
    data: state.test.data
})

const actions = {
    incrementCounter,
    decrementCounter
}

class TestComponents extends Component {
    state={
        locationLatLng: {lat:10,lng:100}
    }

    handleLocationSelect= selectedLocation => {
        geocodeByAddress(selectedLocation)
        .then(results => getLatLng(results[0]))
        .then(latlng => {
          this.setState({locationLatLng: latlng})
        })
    }
    render() {
        const {data, incrementCounter, decrementCounter } = this.props;
        return (
            <div>
                <h1>Test Component</h1>
                <h3>The Answer is: {data}</h3>
                <Button onClick={incrementCounter} positive content='increment'/>
                <Button onClick={decrementCounter} negative content='decrement'/>
                <br/>
                <br/>

                <TestPlaceInput name='test'
                component={PlaceInput}
                options={{types: ['establishment']}}
                selectAdress={this.handleLocationSelect}
                placeholder='Event city'/>

                <SimpleMap key={this.state.locationLatLng.lng} latlng={this.state.locationLatLng}/>
            </div>
        );
    }
}

export default connect(mapState, actions)(TestComponents);