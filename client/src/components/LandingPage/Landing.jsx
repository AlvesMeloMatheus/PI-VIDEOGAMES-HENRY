import './Landing.css';
//--------- ^^ css ^^ ----------------

import React from 'react';
import { Link } from 'react-router-dom';
// ------------ React ----------------

import {Provider } from 'react-redux'
import { useDispatch } from "react-redux"
import { useEffect } from "react"
// ------------ Redux ----------------


import store from '../../Redux/store';
import { getGenres } from '../../Redux/actions';
// ------------ Redux comp -----------

const Landing = () => {
    
  const dispatch = useDispatch();

  useEffect((() => {
    dispatch(getGenres())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  return (
    <div className='LandingCSS'>
      
      <Provider store={store} >

        <Link to="/home">
            <button id='Welcome'>WELCOME</button>
        </Link>
      </Provider>

    </div>
    
  )
}

export default Landing;