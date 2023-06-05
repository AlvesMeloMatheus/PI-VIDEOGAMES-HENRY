import { GET_VIDEOGAMES, GET_VIDEOGAMES_NAME, 
    GET_VIDEOGAMES_ID_DETAIL, GET_GENRES, 
    POST_VIDEOGAMES,
    ORDER_VIDEOGAMES,
    FILTER_VIDEOGAMES} from "./types";

import axios from "axios";

// ---------all games ---   V
export function getVideogames () {
    return async function (dispatch) {
        const reponse = await axios.get("http://localhost:3001/videogames");
        console.log("game from back: " + JSON.stringify(reponse));
        return dispatch ({
            type: GET_VIDEOGAMES,
            payload: reponse.data.videogames,
        })
    }
}
// -------------------

// ---------name ---- X
export function getVideogamesName (videogameName) {
    return async function (dispatch) {
        const res = await axios.get(`http://localhost:3001/videogames?name=${videogameName}`);
        console.log("game by NAME from back: " + JSON.stringify(res));
        return dispatch ({
            type: GET_VIDEOGAMES_NAME,
            payload: res.data.videogames,
        })
    }
}
// ----------------------------

// ---------deatil ----- X
export function getVideogamesIdDetail (idVideogame) {
    return async function (dispatch) {
        const reponse = await axios.get(`http://localhost:3001/videogames/${idVideogame}`);
        console.log("game by ID from back: " + JSON.stringify(reponse) + "<--------");
        return dispatch ({
            type: GET_VIDEOGAMES_ID_DETAIL,
            payload: reponse.data,
        })
    }
}
// ----------------------------

// ---------genres ----- V
export function getGenres () {
    return async function (dispatch) {
        const reponse = await axios.get("http://localhost:3001/genres");
        console.log("GENRES game from back: " + reponse.data);
        return dispatch ({
            type: GET_GENRES,
            payload: reponse.data,
        })
    }
}
// ----------------------------

// ------------newGame ------ /
export function postVideogames (body) {
    return async function (dispatch) {
        const bodyJson = {
            body: body
        }
        const response = await axios.post("http://localhost:3001/videogames/create", JSON.parse(body));
        console.log(response)
        return dispatch ({
            type: POST_VIDEOGAMES, 
            payload: response.data,
        });
    };
};
// --------------------------------

// --------------- ORDER ----------
export function orderVideogames (criterio, videogames) {
    return async function (dispatch) {
        console.log("action");
        var orderedVideogames = [];
        if(criterio === "name_asc") {
            orderedVideogames = videogames.sort((a, b) => a.name.localeCompare(b.name));

        } else if (criterio === "name_dsc") {
            orderedVideogames = videogames.sort((a, b) => -a.name.localeCompare(b.name));

        } else if (criterio === "rating_asc") {
            orderedVideogames = videogames.sort((a,b) => a.rating - b.rating);
            console.log(videogames.rating);

        } else if (criterio === "rating_dsc") {
            orderedVideogames = videogames.sort((a,b) => b.rating - a.rating);

        } else {
            orderedVideogames = videogames;
        }

        const resultArray = [...orderedVideogames]

        console.log(orderedVideogames);
        console.log(resultArray);
        return dispatch({
            type: ORDER_VIDEOGAMES,
            payload: resultArray,
        });
    };
}
// --------------------------------------------

// -------------- FILTER GENRES ---------------
export function filterGenres (genr, videogames) {
    return async function (dispatch) {
        var filteredVideogames = [];
        console.log(genr)
        videogames.forEach((videogame) => {
            console.log(videogame)
            if (videogame.genres?.includes(genr)) {
                filteredVideogames.push(videogame);
            }
        });
    
        return dispatch({
          type: FILTER_VIDEOGAMES,
          payload: filteredVideogames,
        });
    };
}

// -------------- FILTER API/DB ---------------
export function filterIsApi(isFromAPI, videogames) {
    return async function (dispatch) {

        var filteredVideogames = [];

        //saber si el id es uuid o id normal, si uuid es de la db
        const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

        console.log(isFromAPI +"juegos"+ JSON.stringify(videogames));
        videogames.forEach((videogame) => {
            if (isFromAPI && !v4.test(videogame.id)) {
                filteredVideogames.push(videogame);
            } else if (!isFromAPI && v4.test(videogame.id)) {
                console.log(videogame);
                filteredVideogames.push(videogame);
            }
        });
  
        return dispatch({
            type: FILTER_VIDEOGAMES,
            payload: filteredVideogames,
        });
    };
}
