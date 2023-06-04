import React from 'react'
import { useEffect, useState } from "react"
// ---------- React ---------

import { useDispatch, useSelector } from "react-redux"
import {Provider } from 'react-redux'
// ---------- Redux ---------

import './Cards.css'
// ---------- CSS -----------

import Card from './Card/Card';
import PaginationCards from './PaginationCards';
// ---------- Components ----

import store from '../../Redux/store'
import { getVideogames } from '../../Redux/actions';
import FilterAndOrderVideogames from '../NavBar/FilterAndOrderVideogames/FilterAndOrderVideogames'
// ---------- Components redux ----

const Cards = () => {

  const dispatch = useDispatch();
  const videogames = useSelector(store => store.videogames);

  useEffect((
    () => {
      dispatch(getVideogames())
      console.log("effect: " + JSON.stringify(videogames));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = Array.from(videogames).slice(firstPostIndex, lastPostIndex)

  return (
    <div className='Container'>
        <Provider store={store} >

          <FilterAndOrderVideogames />

          {currentPosts.map((videogame, index) => (
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

          <div id='NumPages'>
            <PaginationCards 
              totalPosts={videogames.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>

        </Provider>
    </div>
  )
}

export default Cards;