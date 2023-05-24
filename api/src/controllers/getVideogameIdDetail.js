const axios = require("axios");

require('dotenv').config();
const { API_KEY } = process.env;

const { Videogame, Genres } = require("../db");
const { response } = require("express");

const URL = `https://api.rawg.io/api/games`
const apiKey = `?key=${API_KEY}`

async function getVideogameIdDetail (req, res) {
    const {idVideogame} = req.params
    var url = URL + `/${idVideogame}`+ apiKey
    var videogame ;

    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if (idVideogame % 1 === 0) /*API*/ {
        await axios (url)
            .then( async (response) => {
                item = response.data
                
                if ( item?.id !== "") {
    
                    var stringPlatforms=""
                    const platforms = item.platforms
                    for ( var j = 0; j < platforms.length; j ++) {
                        stringPlatforms += platforms[j].platform.name ;
    
                        if(j !== platforms.length-1) {
                            stringPlatforms += " - ";
                        }
                    }
    
                    var stringGenres=""
                    const genres = item.genres
                    for ( var k = 0; k < genres.length; k ++) {
                        stringGenres += genres[k].name ;
    
                        if(k !== genres.length-1) {
                            stringGenres += " - ";
                        }
                    }
                    videogame = {
                        id: item.id,
                        image: item.background_image,
                        name: item.name,
                        released: item.released,
                        rating: item.rating,
                        platform: stringPlatforms,
                        description: item.description || "",
                        genres: stringGenres,
                    }
                    console.log(videogame);
                }
            },
            (error) => console.log(error.message)
        );
    } else if (idVideogame.match(regexExp)) /*DB*/{

        console.log(4 + 4);

        const videogamesDetailDB = await Videogame.findOne({
            where: {id: idVideogame},
            include: [{
                model: Genres,
            }]
        }) || {}
        // console.log(videogamesDetailDB);

        var stringGenres=""
        const genres = videogamesDetailDB.genres
        for ( var k = 0; k < genres.length; k ++) {
            stringGenres += genres[k].name ;

            if(k !== genres.length-1) {
                stringGenres += " - ";
            }
        }

        videogame = {
            id: videogamesDetailDB.id,
            image: videogamesDetailDB.image,
            name: videogamesDetailDB.name,
            released: videogamesDetailDB.released,
            rating: videogamesDetailDB.rating,
            platform: videogamesDetailDB.platforms,
            description: videogamesDetailDB.description || "",
            genres: stringGenres,
        }
        console.log(videogame);

    } else {
        console.log("}}}}}}}} No existo {{{{{{");
        res.status(400).json("El id no cumple con ningun formato deseado (UUID o numero entero)")
        return;
    }

    if(!videogame){
        res.status(404).json("no existe ese video juego")
    }

    res.status(200).json(videogame);
}

module.exports = { getVideogameIdDetail };