const axios = require("axios");

require('dotenv').config();
const { API_KEY } = process.env;

const { Videogame, Genres } = require("../db");
const { response } = require("express");

const URL = `https://api.rawg.io/api/genres`
const apiKey = `?key=${API_KEY}`

async function getGenres (req, res) {

    await axios(URL + apiKey)
        .then(async (response) => {
            
            for(const item of response.data.results){ // api

                const genre = await Genres.findOne({where: {name: item.name}})
                if (!genre){
                    const newG = await Genres.create({name: item.name})
                    console.log(newG);
                }         
            }
        }, (error) => res.status(500).json(error.message)
    )
    const genres = await Genres.findAll();
    res.status(200).json(genres);
}


module.exports = { getGenres };
