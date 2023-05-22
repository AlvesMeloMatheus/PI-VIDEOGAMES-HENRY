const { DataTypes } = require('sequelize');
// --------------- DB -modules ---------------

const { Genres } = require('./Genres');
// --------------- otra tabla ----------------

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

  });
};
