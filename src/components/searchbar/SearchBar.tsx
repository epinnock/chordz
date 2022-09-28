import { Button, Grid, TextField } from '@mui/material';
import * as React from 'react';

//write searchbar component that uses material ui grid and textfield and submit button



export default function SearchBar({onSearch}:any){
    // create a state for the search query
    const [searchQuery,setSearchQuery]=React.useState("")


    // create a callback for when the search button is clicked
    const onSearchClick = () => {
        onSearch(searchQuery)
    }

    // create a callback for when the search query is changed
    const onSearchQueryChange = (event:any) => {
        setSearchQuery(event.target.value)
    }


    //create material ui grid
    return(<Grid container spacing={2} >
            <Grid item xs={8}>
            <TextField fullWidth label="Enter a youtube link" id="search" variant="outlined" value={searchQuery} onChange={onSearchQueryChange}/>
             </Grid> 
            <Grid item xs={4}>
                <Button variant="outlined" onClick={onSearchClick}>Search</Button>
            </Grid>
        </Grid>)
 }
