import { GET_VIDEOGAMES, GET_VIDEOGAMES_NAME, 
    GET_VIDEOGAMES_ID_DETAIL, GET_GENRES, 
    POST_VIDEOGAMES} from "./types";

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
