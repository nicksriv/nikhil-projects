import React from 'react';
import {
    Button
} from '@material-ui/core';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
import { compose, withProps } from "recompose";
import GoogleMapStyles from './GoogleMapStyles';

const V5LocationMap = (props) => {
    const {

    } = props;

    const MyMapComponent = compose(
        withProps({
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `120px` }} />,
            mapElement: <div style={{ height: `100%` }} />
        }),
        withScriptjs,
        withGoogleMap
    )(props => (
        <GoogleMap defaultZoom={4} defaultCenter={{ lat: -34.397, lng: 150.644 }}
            //options={{ streetViewControl: false }}
            defaultOptions={{
                disableDefaultUI: true, // disable default map UI
                draggable: false, // make map draggable
                keyboardShortcuts: false, // disable keyboard shortcuts
                scaleControl: false, // allow scale controle
                scrollwheel: false, // allow scroll wheel                
                styles: GoogleMapStyles // change default map styles
            }}
        >
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>
    ));

    return (
        <>
            <MyMapComponent></MyMapComponent>
            <Button size="small"
                variant="outlined"
                disabled
                style={{ fontSize: "0.5rem", marginTop: "3px" }}>
                SELECT LOCATION MANUALLY
            </Button>
        </>
    );
}

export default V5LocationMap;