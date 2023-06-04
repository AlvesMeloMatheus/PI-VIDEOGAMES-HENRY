import React, { Fragment, useEffect } from 'react'
// ------------------- react -----------

import { useDispatch, useSelector } from "react-redux"
import {Provider } from 'react-redux'
// ------------------- redux -----------

import { orderVideogames, filterGenres, filterIsApi, getVideogames, getGenres } from '../../../Redux/actions'
import store from '../../../Redux/store'
// ------------------- redux comps -----------

import './FilterAndOrderVideogames.css'
// ------------------- css -------------

const FilterAndOrderVideogames = () => {

    const dispatch = useDispatch();
    useEffect((() => {
        dispatch(getGenres())
        dispatch(getVideogames)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [])
    const videogames = useSelector(store => store.videogames)
    const genresApi = useSelector(store => store.genres)

    const onGenrChange = (event) => {
        console.log(event.target.value)
        console.log(videogames)
        dispatch(filterGenres(event.target.value, videogames))
    }

    const onOriginChange = (event) => {
        console.log(event.target.value)
        const isApi = event.target.value==="api"
        dispatch(filterIsApi(isApi, videogames))
    }

    const onOrderChange = (event) => {
        console.log(event.target.value)
        dispatch(orderVideogames(event.target.value, videogames))
    }

    // ----------- para limpiar los filtros ---------
    const onClear = () => {
        dispatch(getVideogames())
    }

    return (
        
        <Fragment>
        <Provider store={store}>
            <div className='ContainerFilters'>

                <div id='FilterGenres'>
                    <p>Filter by genre</p>
                    <select
                        id="comboTemp"
                        name="tempId"
                        className="form-control"
                        onChange={onGenrChange}
                    >
                        {genresApi.map((genr) => {
                        return (
                            <option key={genr.name} value={genr.name}>
                            {genr.name}
                            </option>
                        );
                        })}
                    </select>
                </div>

                <div id='FilterAPIyDB'>
                    <p>Filter if is from API or DB</p>
                    <select
                        id="comboOrigin"
                        name="originId"
                        className="form-control"
                        onChange={onOriginChange}
                    >
                        <option key="api" value="api">
                            API
                        </option>
                        <option key="db" value="db">
                            DB
                        </option>
                    </select>
                </div>
    

                <div id='FilterRatingAZ'>
                    <p>Order by</p>
                    <select
                        id="comboOrigin"
                        name="originId"
                        className="form-control"
                        onChange={onOrderChange}
                    >
                        <option key="name_asc" value="name_asc">
                        A - Z
                        </option>
                        <option key="name_dsc" value="name_dsc">
                        Z - A
                        </option>
                        <option key="rating_asc" value="rating_asc">
                        Rating asc
                        </option>
                        <option key="rating_dsc" value="rating_dsc">
                        Rating desc
                        </option>
                    </select>
                </div>

                <button
                    id="BtnClear"
                    name="BtnClear"
                    className="form-control"
                    onClick={onClear}
                    >Clear Filters and Order by
                </button>
            </div>
        </Provider>
    </Fragment>
    
    )
}

export default FilterAndOrderVideogames;