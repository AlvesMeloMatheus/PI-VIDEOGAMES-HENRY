import React from 'react'
import { NavLink } from 'react-router-dom'; //-detail
// ----------- React -----------

import './Card.css';
// ----------- CSS -------------



const Card = ({name, image, genres, id}) => {
  return (
    
    <div className='BorderCard'>

        <h2 id='CardName'>{name}</h2>

        <img className='GameImg' src={image} alt={image} />

        <div className='BorderGame'>

            <NavLink to={`/videogames/${id}`}>
              <button className='BtnDetail'>Detail:</button>
            </NavLink>

            <h4 id='GameGenres'>Genres: {genres}</h4>
            
        </div>
    </div>
  )
}

export default Card;