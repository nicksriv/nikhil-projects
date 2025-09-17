import React, { useState } from 'react';
import Geocode from "react-geocode";
import ComponentHeader from '../form-elements/component-header';
import ComponentLabel from './material-element-label';
import { Button, Grid, TextField, FormLabel } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
import { compose, withProps } from "recompose";

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: '100%',
        height: '150px',
        top: 0,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1),
        outline: "none"
    }
}));

let address = '';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        display: 'flex',
        flexDirection: 'column',
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class LocationCoordinates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLatLong: false,
            latitude: '',
            longitude: '',
            showMapView: false,
            positions: {
                latitude: '',
                longitude: '',
            },
            address: ''
        }
    }

    componentDidMount() {
        if (this.props.data.customOptions.defaultValue) {
            const v = this.props.data.customOptions.defaultValue;
            this.setState({
                latitude: v.latitude,
                longitude: v.longitude,
                address: v.address,
                positions: {
                    latitude: v.latitude,
                    longitude: v.longitude
                }
            })
        }
    }

    getLatLong = (item) => {
        const self = this;
        let location = null;
        let lat = '';
        let lng = '';

        if (this.state.latitude && this.state.longitude) {
            this.setState({ showMapView: true });
            this.setState({ mapLoaded: true });
        } else {
            if (window.navigator && window.navigator.geolocation) {
                location = window.navigator.geolocation;
            }
            if (location) {
                location.getCurrentPosition(function (position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;
                    Geocode.setApiKey("AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M");

                    // set response language. Defaults to english.
                    Geocode.setLanguage("en");
                    Geocode.setLocationType("ROOFTOP");
                    Geocode.fromLatLng(lat, lng).then(
                        (response) => {
                            const address = response.results[0].formatted_address;
                            if (address) {
                                self.setState({ address: address });
                                self.onLocationChange(address, lat, lng);
                            }
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                    // if(this.props.handleLocationChange) {
                    //     this.props.handleLocationChange({
                    //         address: address,
                    //         latitude: lat,
                    //         longitude: lng
                    //     });
                    // }
                    self.setState({ showMapView: item.props.data.customOptions.displayMapOption !== "Text" ? true : false, latitude: lat, longitude: lng, positions: { latitude: lat, longitude: lng } });
                })
            }
        }
    }

    setMarkerPosition = (ev) => {
        if (this.props.isMapEditable) {
            this.setState({ latitude: ev.latLng.lat(), longitude: ev.latLng.lng() });
            Geocode.setApiKey("AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M");
            Geocode.setLanguage("en");
            Geocode.setLocationType("ROOFTOP");
            Geocode.fromLatLng(ev.latLng.lat(), ev.latLng.lng()).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    console.log(address)
                    if (address) {
                        this.setState({ address: address });
                        this.onLocationChange(address, ev.latLng.lat(), ev.latLng.lng());
                    }
                },
                (error) => {
                    console.error(error);
                }

            );
        } else {
            return null;
        }
    }

    handleClose = () => {
        this.setState({ showMapView: false });
    }

    onLocationChange = (address, lat, lng) => {
        if(this.props.handleLocationChange) {
            let event = { target: {
                value: {
                    address: address,
                    latitude: lat,
                    longitude: lng
                }
            }}
            console.log(event)
            this.props.handleLocationChange(event);
        }
    }
    getLoactionFromAddress = () => {
        Geocode.setApiKey("AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M");
        Geocode.setLanguage("en");
        Geocode.setLocationType("ROOFTOP");
        Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
            (response) => {
                const address = response.results[0].formatted_address;
                if (address) {
                    this.onLocationChange(address, this.state.latitude, this.state.longitude);
                    this.setState({ 'address': address, "latitude": this.state.latitude, "longitude": this.state.longitude, showMapView: true });
                    // formik.setFieldValue([data.id], { latitude: lat, longitude: lng});
                }
            },
            (error) => {
                console.error(error);
            }

        );
    }
    handleAddress = (e) => {
        const { value } = e.target;
        this.setState({ address: value });
        Geocode.setApiKey("AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M");
        Geocode.setLanguage("en");
        Geocode.setLocationType("ROOFTOP");
        Geocode.fromAddress(value).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState(({ latitude: lat, longitude: lng }));
            },
            (error) => {
                console.error(error);
            }
        );
    }
    // pointMaker = (data) => {
    //     const lat = data.latLng.lat();
    //     const lng = data.latLng.lng();
    //     this.setState({ showMapView: false, showLatLong: true, latitude: lat, longitude: lng, positions: { latitude: lat, longitude: lng } });
    // }

    render() {

        const MapView = () => {
            const classes = useStyles();
            const [modalStyle] = useState(getModalStyle);

            const MyMapComponent = compose(
                withProps({
                    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M&v=3.exp&libraries=geometry,drawing,places",
                    loadingElement: <div style={{ height: `100%` }} />,
                    containerElement: <div style={{ height: `134px` }} />,
                    mapElement: <div style={{ height: `100%` }} />
                }),
                withScriptjs,
                withGoogleMap
            )(props => (
                <GoogleMap defaultZoom={8} defaultCenter={{ lat: this.state.latitude ? this.state.latitude : this.state.positions.latitude, lng: this.state.longitude ? this.state.longitude : this.state.positions.longitude }}
                    onClick={(ev) => this.setMarkerPosition(ev)}
                >
                    <Marker position={this.props.isMapEditable ? { lat: this.state.latitude, lng: this.state.longitude } : { lat: this.state.positions.latitude, lng: this.state.positions.longitude }} />
                </GoogleMap>
            ));

            return (
                <div className={classes.paper}>
                    <MyMapComponent />
                </div>
            );
        };
        // const disabled = this.props.read_only || false; 
        const propsData = this.props.data;
        return (
            <div className='SortableItem rfb-item'>
                { !this.props.fromDisablePointView ? <ComponentHeader {...this.props} />: null}
                <div className="form-group">
                    <ComponentLabel {...this.props} />
                    {
                        !this.state.showLatLong &&
                        <Grid>
                            {/* {
                                disabled ?
                                    (
                                        <Button
                                            disabled={true}
                                            variant="outlined"
                                            style={{ marginTop: '15px', backgroundColor: "transparent", border: "1px solid #2C3E93", color: "#2C3E93", fontWeight: "500", float: "right" }}
                                        >
                                            GET LOCATION
                                        </Button>
                                    )
                                    :
                                    (
                                            <> */}

                                    {this.state.showMapView ? 
                                    <MapView>
                                        <p>map</p>
                                    </MapView>
                                    : 
                                    propsData.customOptions.displayMapOption !== "Text" ? 
                                    <img style={{ height: "150px",position:"inherit",width: "100%" }} src={`/assets/images/map.png`} alt="map" /> : null}
                                        {this.props.read_only ?
                                        null
                                        :
                                        <Button
                                            variant="contained"
                                            disabled={propsData.customOptions.checked ? false : true}
                                            onClick={() => this.getLatLong(this)}
                                            style={{ marginTop: this.state.showMapView ? "0rem" : "15px", marginBottom: this.state.showMapView ? "1.5rem" : "", backgroundColor: "transparent", border: "1px solid #2C3E93", color: "#2C3E93", fontWeight: "500", float: "right" }}>
                                            GET LOCATION
                                        </Button>
                                        }
                                    {/* </>
                                    )
                            } */}
                                {
                                    propsData.customOptions.displayMapOption !== "Map" && <div style={{ marginTop: this.state.showMapView ? "8.5rem" : "3.5rem" }}>
                                        <p style={{ marginBottom: "-0.1rem", fontWeight: "400", color: "rgba(0,0,0,0.7)" }}>{propsData.customOptions.addressLabel}</p>
                                        {this.props.isMapEditable ? <TextField variant='outlined' fullWidth value={this.state.address} placeholder="Address appear here" onBlur={this.getLoactionFromAddress} onChange={(e) => this.handleAddress(e)} /> : <p style={{ fontWeight: "400", color: "#B7B7B6", fontSize: "1.02rem" }}>{this.state.address ? this.state.address : "Address appear here"}</p>}

                                    </div>
                                }
                        </Grid>
                    }

                    {/* {
                        this.state.showLatLong &&
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2} >
                                    <FormLabel className="padding-top-10" component="legend">Latitude</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={10} className="padding-bottom-10">
                                    <TextField
                                        type="text"
                                        size="small"
                                        label="Latitude"
                                        variant='outlined'
                                        value={this.state.latitude}
                                        onChange={e => this.setState({ latitude: e.target.value })}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2} >
                                    <FormLabel className="padding-top-10" component="legend">Longitude</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={10} className="padding-bottom-10">
                                    <TextField
                                        type="text"
                                        size="small"
                                        label="Longitude"
                                        variant='outlined'
                                        value={this.state.longitude}
                                        onChange={e => this.setState({ longitude: e.target.value })}
                                    />
                                </Grid>
                            </Grid>
                            <Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.getLatLong}
                                    style={{ marginTop: '10px' }}>
                                    Refresh Location
                                </Button>
                            </Grid>
                        </>

                    } */}

                    {/* <MapView></MapView> */}
                </div>
            </div>
        );
    }
}

export default LocationCoordinates;