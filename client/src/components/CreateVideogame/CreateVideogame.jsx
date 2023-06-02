import React, { Fragment, useState, useEffect } from 'react';
// --------------- react ----------

import { useDispatch, useSelector } from "react-redux"
import {Provider } from 'react-redux'
// --------------- redux ----------

import store from '../../Redux/store';
import { postVideogames, getGenres } from '../../Redux/actions';
// --------------- redux comps ---

import './CreateVideogame.css';
// --------------- css -----------

const CreateVideogame = () => {

    useEffect((() => {
        dispatch(getGenres())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [])
    
    const genresApi = useSelector(store => store.genres)
    // console.log(genresApi);

    const [cubeState, setCubeState] = useState(
        new Array(genresApi.length).fill(false)
    );
    const initCube = new Array(genresApi.length).fill(false);

    const [videogames, setVideogames] = useState({
        name: '',
        description: '',
        platform: '',
        released: '',
        rating: '',
        genres: '',
    })

    const handleInputChange = (event) => {
        // console.log(event.target.value);

        setVideogames({
            ...videogames,
            [event.target.name]: event.target.value
        })

    }

    const handleOnChange = (position) => {

        if(cubeState.length===0){
            const updateInitCubeState = initCube.map(
                (item, index) => {
                    return  (index === position) ? !item : item
                }
            );
            setCubeState(updateInitCubeState);
        } else {
            const updateCubeState = cubeState.map(
                (item, index) => {
                    return  (index === position) ? !item : item
                }
            );
            setCubeState(updateCubeState);
        }

    }

    const dispatch = useDispatch();

    const submitDate = (event) => {
        console.log(cubeState)
        event.preventDefault();
        const genresString = cubeState.reduce(
            (str, currentState, index) => {
              if (currentState === true) {
                return str + genresApi[index].name + ', ';
              }
              return str;
            },
            ''
          );
        var videogameFromForm = {
            ...videogames,
            platform: videogames.platform,
            released: videogames.released,
            rating: videogames.rating,
            genres: genresString,
            description: videogames.description,
            image: "https://i.pinimg.com/originals/2c/58/10/2c5810b644a690f4495fd8571801435b.gif"
        }
        const body= JSON.stringify(videogameFromForm)
        console.log(body)
        dispatch(postVideogames(body))
        console.log(videogames.name + ' ' + videogames.released);
    }

    return (
        <Fragment>
        <Provider store={store}>
            <h1>🧙‍♂️ Create your videogame 🤺</h1>
            <form onSubmit={submitDate}>

                <div>
                    <input className='InpN'
                        placeholder="Name:" 
                        type="text"  
                        name='name'
                        onChange={handleInputChange}
                        />
                </div>

                <div>
                    <input className='InpP'
                        placeholder="Platform:" 
                        type="text" 
                        name='platform'
                        onChange={handleInputChange}
                        />
                </div>


                <div>
                    <input className='InpRL'
                        placeholder="Released:" 
                        type="text" 
                        name='released'
                        onChange={handleInputChange}
                        />
                </div>

                <div>
                    <input className='InpRA'
                        placeholder="Rating:" 
                        type="text" 
                        name='rating'
                        onChange={handleInputChange}
                        />
                </div>

                <div>
                    <input className='InpD'
                        placeholder="Description:" 
                        type="text" 
                        name='description'
                        onChange={handleInputChange}
                        />
                </div>

                <div className='Checkbox'>
                    {genresApi.map(({name}, index) => {
                        return (
                            <div className='CheckboxContainer' key={index}>
                                <input className='CubeHover'
                                    placeholder="Genres: genre1, genre2, genreN" 
                                    type="checkbox"
                                    id={`custom-checkbox-${index}`} 
                                    name={name}
                                    value={name}
                                    checked={cubeState[index]}
                                    onChange={() => handleOnChange(index)}
                                />
                                <label className='TextCubeHover' htmlFor={`custom-checkbox-${index}`}>
                                    {name}
                                </label>
                            </div>
                        );
                    })}
                </div>

                <div>
                    <button id='BtnSub' type="submit" >Submit</button>
                </div>

            </form>
        </Provider>
    </Fragment>
    )
}

export default CreateVideogame;