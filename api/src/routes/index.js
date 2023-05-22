const { Router } = require('express');
// ------------ Node Modules ---------

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const { getVideogames } = require ("../controllers/getVideogames");
const { getVideogameIdDetail } = require("../controllers/getVideogameIdDetail");
const { getVideogameName } = require('../controllers/getVideogameName');
const { getGenres } = require('../controllers/getGenres');

const { postNewGame } = require ("../controllers/postVideogames");
// ------------ controllers ----------


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();
router.get("/videogames", function (req, res) {
    if (req.query.name) {
        getVideogameName(req, res)
    } else {
        getVideogames(req, res)
    }
});
router.get("/videogames/:idVideogame", getVideogameIdDetail);
router.get("/genres", getGenres);

router.post("/videogames/create", postNewGame);

module.exports = router;
