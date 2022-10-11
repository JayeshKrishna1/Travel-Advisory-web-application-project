import React,{useState,useEffect,createRef} from 'react';
import {Grid,Typography,InputLabel,MenuItem,FormControl,Select, CircularProgress} from '@material-ui/core';

import useStyles from './style'; 
import PlaceDetails from '../PlaceDetails/PlaceDetails';


const List =({places,childClicked,isloading,type,setType,rating,setRating})=>{
    const classes = useStyles();
    const [elRefs,setElRefs] = useState([]);

    useEffect(()=>{
        console.log({elRefs});
        const refs = Array(places?.length).fill().map((_,i) => elRefs[i] || createRef());
        console.log({places});
        console.log({refs});
        setElRefs(refs);
    },[places])

//     // const places =[
//     // {name : 'Bhavani'},
//     // {name : 'Perundurai'},
//     // {name : 'Nasiyanoor'},
//     // {name : 'chitode'}
// ];

    return (
        <div className={classes.container}>
            <Typography varient ='h4'>Restaurants,Hotels & Attractions around you</Typography>
            {isloading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                <>
            <FormControl className={classes.FormControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=>setType(e.target.value)}>
                    <MenuItem value='restaurants'>Restaurants</MenuItem>
                    <MenuItem value='hotels'>Hotels</MenuItem>
                    <MenuItem value='attractions'>Attractions</MenuItem>
                </Select>
                <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3</MenuItem>
                    <MenuItem value={3.5}>Above 3.5</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places.map((place,i)=>{
                    return (<Grid item key={i} xs={12}>
                        <PlaceDetails  place={place} 
                        selected={Number(childClicked) === i} 
                        refProp={elRefs[i]}/>
                    </Grid>)
                })}
            </Grid>
            </>
            )}
        </div>
    );
}

export default List;