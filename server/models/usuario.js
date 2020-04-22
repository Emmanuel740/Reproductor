const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    apellidos: {
        type: String,
        required: [true, 'Por favor ingresa los apellidos del usuario']

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el correo electronico']
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña']

    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },

    estado: {
        type: Boolean,
        default: true
    }


});

usuarioSchema.plugin(AutoIncrement, { inc_field: 'id' }, uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);