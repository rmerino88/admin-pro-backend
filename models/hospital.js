// Modelo del hospital

// const moongose = require('mongoose');
// moongose.Schema
const { Schema, model } = require('mongoose');

// Definición del esquema
const HospitalSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
}, {collection: 'hospitales'});

/**
 * Tiene que ser una función normal, por que en las funciones flecha
 * el objeto this, hace referencia al objeto al que hace referencia el this
 * fuera de la función.
 * En la tradicional this haría referencia al HospitalSchema.
 */
// cambiar _id a uid, eliminar __v, passswd
HospitalSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});

// Creación del modelo
// Por defecto mongoose va a crear la tabla con el plural
module.exports = model('Hospital', HospitalSchema);