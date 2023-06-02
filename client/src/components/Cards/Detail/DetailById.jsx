import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// --------------- react -----------

import {Provider } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
// --------------- redux -----------

import './DetailById.css'
// --------------- css -------------

import store from '../../../Redux/store';
import { getVideogamesIdDetail } from '../../../Redux/actions'
// --------------- redux  comps ----


const DetailById = () => {

  const { idVideogame } = useParams();

  const dispatch = useDispatch();
  const videogamesIdDetail = useSelector(store => store.videogamesIdDetail)

  useEffect (
    (() => {
      dispatch(getVideogamesIdDetail(idVideogame))
      console.log("effect: " +JSON.stringify(videogamesIdDetail));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [idVideogame])

  return (
    <div className='DetBox'>

    <Provider store={store} >
      <h4 id='DetId'>{videogamesIdDetail.id}.</h4>

      <h2 id='DetName'>{videogamesIdDetail.name}</h2>

      <img id='DetImg' src={videogamesIdDetail.image} alt={videogamesIdDetail.name} />
      
      <div className='DetBoxChar'>
          <h3 id='DetG'>Genres: {videogamesIdDetail.genres}</h3>
          <h3 id='DetRl'>Released: {videogamesIdDetail.released}</h3>
          <h3 id='DetRa'>Rating: {videogamesIdDetail.rating}</h3>
          <h3 id='DetD'>Description: <span id='TextD'>{videogamesIdDetail.description}</span></h3>
          <h3 id='DetP'>Platforms: {videogamesIdDetail.platform}</h3>
      </div>
    </Provider>

  </div>
  )
}

export default DetailById;