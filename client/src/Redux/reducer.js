import { GET_VIDEOGAMES, GET_VIDEOGAMES_NAME, 
    GET_VIDEOGAMES_ID_DETAIL, GET_GENRES, 
    POST_VIDEOGAMES} from "./types";

const initialState = {
    videogames: [],
    videogamesName: [],
    genres: [],
    videogamesIdDetail: {},
    postVideogames: {},
}

const reducer = ( state = initialState, action) => {

    switch (action.type) {

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
            };

        case GET_VIDEOGAMES_NAME:
            return {
                ...state,
                videogamesName: action.payload,
            };
        
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            };
        
        case GET_VIDEOGAMES_ID_DETAIL:
            return {
                ...state,
                videogamesIdDetail: action.payload,
            };
        
        case POST_VIDEOGAMES:
            return {
                ...state,
                postVideogames: action.payload,
            };

        default:
            return state;    
    }
}

export default reducer;