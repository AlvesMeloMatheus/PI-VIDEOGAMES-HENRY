const { Videogame, Genres } = require("../db");
// ------------ DB ----------------------------


async function  postNewGame (req, res) {

    const json = req.body;
    const { name, image, rating, released, platforms, description, genres} = json

    if (name === undefined || image === undefined || rating === undefined || released === undefined || platforms === undefined || description === undefined || genres === undefined) {
        res.status(400).json("Falta algun parametro en el body")
    } else {
        console.log(genres);

        const objDB = await Videogame.findOne({where: {name}});
        var newGame;
        if (objDB) {
            console.log("ya existe");
            res.status(500).json("Ya existe ese nombre")
        } else {
            try {
    
                if (genres.length < 1) {
                    throw new Error("Necesario por lo menos un genero");
                };
    
                newGame = await Videogame.create({ 
                    name, 
                    image, 
                    rating, 
                    released, 
                    platforms, 
                    description, 
                })
                console.log(newGame);
        
                console.log(genres);
        
                for (var i = 0; i < genres.length; i++) {
                    console.log(genres[i]);
                    var genre = await Genres.findOne({where: {name: genres[i].name}})
                    if (genre){
                        await newGame.addGenres(genre)
                    } 
                }
            }
            catch (err) {
                res.status(500).json(err.message)
            }
        }
    
        if(newGame){
                const createdGame = await Videogame.findOne({where: {name: newGame.name},
            include: [{
                model: Genres,
            }]})
    
        res.status(200).json(createdGame);
        }
    }




};

module.exports = { postNewGame };