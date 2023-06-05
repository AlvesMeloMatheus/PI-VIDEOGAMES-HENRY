import React from 'react';
import { NavLink } from 'react-router-dom';
// ------------ react --------

import {Provider } from 'react-redux';
// ------------ redux --------

import store from '../../Redux/store';
// ------------ redux comps --------

import "./NavBar.css"
// ------------ css ----------

import SearchBar from './SearchBar/SearchBar';
// ------------ comps --------

const NavBar = () => {

    return (
      <div className='NavBarTotal'>

        <div >

            <NavLink to='/home'>
              <button id='BtnHOME' >Home</button>
            </NavLink>

            <NavLink to='/videogames/create'>
              <button id='BtnCREATE' >Create your Game</button>
            </NavLink>

            <NavLink to='/'>
              <button id='BtnEXIT' >Exit</button>
            </NavLink>
        </div>

        <div>
            <Provider store={store} > 
                <SearchBar />
            </Provider>
        </div>

    </div>
    )
}

export default NavBar;