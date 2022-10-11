import React,{useEffect,useState} from 'react';
import {CssBaseline,Grid} from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';

import {getPlaces} from './api/index';

const App =() =>{
    const [places,setPlaces] = useState([]);
    const [filteredPlaces,setFilteredPlaces] = useState([]);
    const [coordinates,setCoordinates] = useState({lat : 0,lng:0});
    const [bounds,setBounds] = useState({sw:{lat:0.018496513045434426,lng:0.02201557159423828},ne:{lat:-0.018496513045420215,lng:-0.02201557159423828}});
    const [childClicked,setChildClicked] = useState(null);
    const [isloading,setIsLoading] =useState(false);
    const [type,setType] = useState('restaurants');
    const [rating,setRating] = useState('');
    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude,lng:longitude});
        })
    },[])

    useEffect(()=>{
        const filterPlaces = places.filter((place)=> place.rating > rating);
        setFilteredPlaces(filterPlaces);
    },[rating])

   useEffect(()=>{
       setIsLoading(true);
   getPlaces(type,bounds.sw,bounds.ne).then((data)=>{
    console.log(data);
    setPlaces(data?.filter((place)=> place.name && place.num_reviews >0));
    setFilteredPlaces([]);
    setIsLoading(false);
      });
   },[type,bounds]);

    return (
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{width : '100%'}}>
                <Grid item xs={12} md={4}>
                    <List places={filteredPlaces.length ? filteredPlaces : places} 
                    childClicked={childClicked} 
                    isloading={isloading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map setCoordinates={setCoordinates} 
                    setBounds={setBounds} 
                    coordinates={coordinates} 
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}/>
                </Grid>
            </Grid>   
        </>
    );
}

export default App;