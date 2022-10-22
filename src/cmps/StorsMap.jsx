
import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class _StorsMap extends  React.Component {

    state = {
        center: {
            lat: 32.109333,
            lng: 34.855499
        },
        isInfoWindowOn : false
    }

    onMapClicked = (props, map, ev) => {
        console.log('props', props);
        console.log('map', map);
        console.log('ev', ev);
        this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } })
    }

    onMarkerClicked=()=>{
        this.setState({isInfoWindowOn: true})
    }

    onInfoWindowClose=()=>{
        this.setState({isInfoWindowOn: false}) 
    }

    render() {
        return ( 
            
            <Map
                google={this.props.google}
                zoom={10}
                initialCenter={this.state.center}
                onClick={this.onMapClicked}
                center={this.state.center}
                style={{width:"85%"}}
               
            >

                <Marker
                    position={this.state.center}
                    name={'Current location'} 
                    onClick={this.onMarkerClicked}
                    />

                <InfoWindow 
                onClose={this.onInfoWindowClose}
                position={this.state.center}
                visible={this.state.isInfoWindowOn}
                >
                    <div>
                        <h4>Rotshild 75,Tel-Aviv-Yaffo</h4>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export const StorsMap = GoogleApiWrapper({
    apiKey: ('AIzaSyBcHbsl6HTfMsdpKO2d3xY9UYQdF4BIUG4')
})(_StorsMap)