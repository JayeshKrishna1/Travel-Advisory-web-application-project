import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper,Typography,useMediaQuery} from '@material-ui/core';
import  LocationOnOutlinedIcon  from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style';
import mapStyles from './mapStyles';

const Map =({setCoordinates,setBounds,coordinates,places,setChildClicked})=>{
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
               bootstrapURLKeys={{key :process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
               defaultCenter={coordinates}
               center={coordinates}
               defaultZoom={14}
               margin={[50,50,50,50]}
               options={{disabledDefaultUI:true, zoomControl:true, styles:mapStyles}}
               onChange={(e)=>{
                   console.log(e);
                   setCoordinates({lat:e.center.lat , lng:e.center.lng});
                   setBounds({sw:e.marginBounds.sw,ne:e.marginBounds.ne});
               }}
               onChildClick={(child)=>{console.log(child); return setChildClicked(child)}}
            >
                {places.map((place,i)=>(
                    <div
                      className={classes.markerContainer}
                      lat={Number(place.latitude)}
                      lng={Number(place.longitude)}
                      key={i}
                    >
                        {!isDesktop ? (
                            <LocationOnOutlinedIcon color="primary" fontsize="large"/>
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.typography} varient="subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img className={classes.pointer} src={place.photo ? place.photo.images.large.url : 'https://d4t7t8y8xqo0t.cloudfront.net/app/eazymedia/restaurant%2F110025%2Frestaurant020160519143002.jpg'} alt={place.name}/>
                            </Paper>
                        )}
                        <Rating size="small" value={Number(place.rating)} readOnly/>
                    </div>

                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;