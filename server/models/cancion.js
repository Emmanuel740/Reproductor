const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let cancionSchema = new Schema({
    titulo:{
        type:String,
        required:[true,"ingresa el titulo de la cancion"]
    },
    artista:{
        type:String,
        required:[true,"ingresa el artista"]
    },
    duracion:{
        type:Number,
        required:[true,"ingresa la duracion "]
    } 

});
cancionSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Cancion', cancionSchema);