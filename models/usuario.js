// Modelo del usuario

// const moongose = require('mongoose');
// moongose.Schema
const { Schema, model } = require('mongoose');

// Definición del esquema
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    passwd: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

/**
 * Tiene que ser una función normal, por que en las funciones flecha
 * el objeto this, hace referencia al objeto al que hace referencia el this
 * fuera de la función.
 * En la tradicional this haría referencia al UsuarioSchema.
 */
// cambiar _id a uid, eliminar __v, passswd
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, passwd, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

// Creación del modelo
// Por defecto mongoose va a crear la tabla con el plural
module.exports = model('Usuario', UsuarioSchema);