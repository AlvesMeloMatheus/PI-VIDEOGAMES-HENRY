const axios = require("axios");

require('dotenv').config();
const { API_KEY } = process.env;

const { Videogame, Genres } = require("../db");
const { response } = require("express");

const URL = `https://api.rawg.io/api/games`
const apiKey = `?key=${API_KEY}`


async function getVideogames (req, res) {
    console.log(URL + apiKey)
    var videogames = [];
    var videogame = {};
    console.log(videogames.length)

    var url = URL + apiKey;

    while(videogames.length !== 100){
        console.log(videogames.length + " " + url)
        await axios(url)
        .then( (response) => {
            
            var queBusco = response.data.results;

            for (var i = 0; i < queBusco.length; i++) {

                // console.log("aqui es: ->",response.data.results[i]?.id);
                if ( queBusco[i]?.id !== "") {

                    var stringPlatforms=""
                    const platforms = queBusco[i].platforms
                    for ( var j = 0; j < platforms.length; j ++) {
                        stringPlatforms += platforms[j].platform.name ;

                        if(j !== platforms.length-1) {
                            stringPlatforms += " - ";
                        }
                    }

                    var stringGenres=""
                    const genres = queBusco[i].genres
                    for ( var k = 0; k < genres.length; k ++) {
                        stringGenres += genres[k].name ;

                        if(k !== genres.length-1) {
                            stringGenres += " - ";
                        }
                    }
                    videogame = {
                        id: queBusco[i].id,
                        image: queBusco[i].background_image,
                        name: queBusco[i].name,
                        released: queBusco[i].released,
                        rating: queBusco[i].rating,
                        platform: stringPlatforms,
                        description: queBusco[i].description || "",
                        genres: stringGenres,
                    }
                    videogames.push(videogame);
                    console.log(videogames);
                }

                if(videogames.length === 100) {
                    break;
                }
                
            }
            url=response.data.next
        }, 
        (error) => res.status(500).json(error.message)
        );
    }
    res.status(200).json({videogames}); 
};

module.exports = { getVideogames };