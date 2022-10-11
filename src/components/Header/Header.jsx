import React,{useState} from 'react';
import {Autocomplete} from '@react-google-maps/api';
import { AppBar,Toolbar,Typography,InputBase,Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './style';

const Header =({setCoordinates})=>{
    const classes = useStyles();
    const [autocomplete,setAutoComplete] = useState(null);

    const onLoad =(autoC)=> { console.log(autoC); setAutoComplete(autoC);};

    const onPlaceChanged =()=>{
        const lat = autocomplete.getPlaces().geometry.location.lat();
        const lng = autocomplete.getPlaces().geometry.location.lng();
        console.log({lat,lng});

        return setCoordinates({lat,lng})
    }

    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography varient='h5' className={classes.title}>
                    Travel Advisor
                </Typography>
                <Box display='flex'>
                    <Typography varient='h5' classNmae={classes.title}>
                        Explore more places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div classname={classes.SearchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder='search...' classes={{root : classes.inputRoot, Input:classes.inputInput}}/>
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;