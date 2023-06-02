import React from 'react';
import { useEffect, } from "react";
// ----------------- react -------------

import { useDispatch, useSelector } from "react-redux";
import {Provider } from 'react-redux';
// ----------------- redux -------------

import './Search.css'
// ----------------- css ---------------

import store from '../../../Redux/store';
import { getVideogamesName } from '../../../Redux/actions';
// ----------------- redux comps -------------

import Card from '../../Cards/Card/Card';
// ----------------- comps -------------------


const Search = () => {

    const dispatch = useDispatch();
    const videogamesName = useSelector(store => store.videogamesName)
  
    useEffect((() => {
      const queryParams = new URLSearchParams(window.location.search)
      const name = queryParams.get("name")
      console.log(name)
  
      
      dispatch(getVideogamesName(name))
      console.log("effect: "+JSON.stringify(videogamesName))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [])


    return (
        <div className='ContainerS'>
            <Provider store={store} >
                
                {videogamesName.map((videogame, index) => (
                    <Card
                    key={index}
                    id={videogame.id}
                    name={videogame.name}
                    image={videogame.image}
                    genres={videogame.genres} 
                    platforms={videogame.platforms}
                    description={videogame.description}
                    released={videogame.released}
                    rating={videogame.rating}
                    />
                    ))
                }
            </Provider>
        </div>
    )
}

export default Search;