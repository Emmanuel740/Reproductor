const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

let Schema = mongoose.Schema;

let cancionSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "ingresa el titulo de la cancion"]
    },
    artista: {
        type: String,
        required: [true, "ingresa el artista"]
    },
    duracion: {
        type: String,
        required: [true, "ingresa la duracion "]
    },
    url: {
        type: String,
        required: [true, "ingresa la direccion de la Cancion"]

    }


});
cancionSchema.plugin(AutoIncrement, { inc_field: 'idCancion' }, uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Cancion', cancionSchema);