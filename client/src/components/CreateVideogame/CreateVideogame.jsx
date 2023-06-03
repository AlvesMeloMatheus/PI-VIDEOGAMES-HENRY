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
        platforms: '',
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

        // const genresString = cubeState.reduce(
        //     (str, currentState, index) => {
        //       if (currentState === true) {
        //         return str + genresApi[index].name + ', ';
        //       }
        //       return str;
        //     },
        //     ''
        //   );

        const genresArray = [];

        cubeState.forEach((elemento, index) => {
            if( elemento === true) {
                genresArray.push(genresApi[index])
            }
        })

        var videogameFromForm = {
            ...videogames,
            platforms: videogames.platforms,
            released: videogames.released,
            rating: videogames.rating,
            genres: genresArray,
            description: videogames.description,
            image: "https://www.pixelstalk.net/wp-content/uploads/images6/Gaming-Wallpaper-4k-HD-Wallpaper-Free-download.jpg"
        }
        const body= JSON.stringify(videogameFromForm)
        console.log(body)
        dispatch(postVideogames( JSON.stringify(videogameFromForm)))
        console.log( "------>" + videogames.name + ' ' + videogames.released + " " + videogames.platform + " " + videogames.rating + " " + videogames.description + + "<---------");
    }

    return (
        <Fragment>
        <Provider store={store}>
            <h1>🧙‍♂️ Create your videogame 🤺</h1>
            <form onSubmit={submitDate}>
                <div className='InputsBox'>
                    <div>
                        <label className='LabelN' for="name">Name:</label>
                        <input className='InpN'
                            placeholder="Name:" 
                            type="text"  
                            name='name'
                            onChange={handleInputChange}
                            />
                    </div>

                    <div>
                        <label className='LabelP' for="platforms">Platforms:</label>
                        <input className='InpP'
                            placeholder="Platform:" 
                            type="text" 
                            name='platforms'
                            onChange={handleInputChange}
                            />
                    </div>


                    <div>
                        <label className='LabelRL' for="released">Released:</label>
                        <input className='InpRL'
                            placeholder="Released:" 
                            type="text" 
                            name='released'
                            onChange={handleInputChange}
                            />
                    </div>

                    <div>
                        <label className='LabelRA' for="rating">Rating:</label>
                        <input className='InpRA'
                            placeholder="Rating:" 
                            type="text" 
                            name='rating'
                            onChange={handleInputChange}
                            />
                    </div>

                    <div>
                        <label className='LabelD' for="description">Description:</label>
                        <input className='InpD'
                            placeholder="Description:" 
                            type="text" 
                            name='description'
                            onChange={handleInputChange}
                            />
                    </div>
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