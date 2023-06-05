import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
// ------------- react -----------

import { useDispatch} from "react-redux";
// ------------- redux -----------

import "./SearchBar.css";
// ------------- css -------------

import { getVideogamesName } from "../../../Redux/actions";
// ------------- redux comps -----------

const SearchBar = ({onSearch}) => {
    
    const dispatch = useDispatch();

    const [videogame, setVideogame] = useState("");

    const handleChange = (event) => {
        const {value} = event.target;

        setVideogame(value);
    }


    function onSearch () {
     console.log(videogame)
     dispatch(getVideogamesName(videogame))
    }


    return (
        <div>
            <input 
                type="search"
                id='search' 
                placeholder='Insert a name' 
                onChange={handleChange}
            />

            <NavLink to={`/search?name=${videogame}`}>
                <button id="BtnSearch" onClick={onSearch}>Search</button>
            </NavLink>
        </div>
    )
}

export default SearchBar;