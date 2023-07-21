import { useState } from "react";
import "./search.css"
import {AsyncPaginate}from "react-select-async-paginate"
import { GEO_API_URL  , geoApiOption} from "../../api";
const Search=({onSearchChange})=>{
    const [search,setSearch]=useState(null);
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,geoApiOption)
        .then((response) => response.json())
        .then((response) => {
            return {
                options :response.data.map((city)=>{
                    return{
                        value: `${city.latitude} ${city.longitude}` ,
                        label:  `${city.name} ${city.countryCode}`,
                    }
                })
            }
        })
        .catch(err=> console.log(err));
    }
     const handleOnChange = (searchData)=>{
        setSearch(searchData); 
        onSearchChange(searchData);
     }
    return(
       
     
        <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        className="in"
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}/>
    
        
    )
}
export default Search;