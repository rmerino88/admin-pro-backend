// Modelo del medico

// const moongose = require('mongoose');
// moongose.Schema
const { Schema, model } = require('mongoose');

// Definición del esquema
const MedicoSchema = Schema({
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
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }
}, {collection: 'medicos'});

/**
 * Tiene que ser una función normal, por que en las funciones flecha
 * el objeto this, hace referencia al objeto al que hace referencia el this
 * fuera de la función.
 * En la tradicional this haría referencia al MedicoSchema.
 */
// cambiar _id a uid, eliminar __v, passswd
MedicoSchema.method('toJSON', function() {
    // const { __v, ...object} = this.toObject();
    const { __v, _id, ...object} = this.toObject();
    object.mid = _id;
    return object;
});

// Creación del modelo
// Por defecto mongoose va a crear la tabla con el plural
module.exports = model('Medico', MedicoSchema);