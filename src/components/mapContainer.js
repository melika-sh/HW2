import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
// <AnyReactComponent
// lat={35.727802}
// lng={51.331674}
// text='My Text'
// />
export default class SimpleMap extends Component {
    state = {
        center: {
            lat: 35.727802,
            lng: 51.331674
        },
        zoom: 15
    };
    name = {};
    constructor(props) {
        super(props);
        this.props = props;
        this.name = props.name || 'gmap';
        if (props.zoom !== undefined) {
            this.state.zoom = parseInt(this.props.zoom, 10);
        }
        if (props.lat !== undefined) {
            this.state.center.lat = parseFloat(this.props.lat);
        }
        if (props.lng !== undefined) {
            this.state.center.lng = parseFloat(this.props.lng);
        }
        if(props.onClick === undefined){
            console.log('Error: you must handle onClick');
        }
    }
    handleClick(event) {
        var lat = event.lat;
        var lng = event.lng;
        this.props.onClick({'lat':lat, 'lng':lng});
    }

    render() {
        console.log(this.state.zoom);
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    name={this.name}
                    key={this.name}
                    bootstrapURLKeys={{ key: 'AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    onClick={(e) => this.handleClick(e)}
                >
                </GoogleMapReact>
            </div>
        );
    }
}


