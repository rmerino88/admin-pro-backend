const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const { actualizarImagen } = require('../helpers/actualizar-imagen')

const fileUpload = async (req, res = response) => {

    try {
        // Obtener la url de la imagen  del body
        const {urlImg} = req.body;
        console.log(urlImg);
        
        // Validar el tipo
        const tiposValidos = ['hospitales', 'usuarios', 'medicos'];
        const tipo = req.params.tipo;
        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({
                ok: false,
                msg: 'El tipo seleccionado no es de tipo usuarios,medicos u hospitales'
            });
        }

        // Asignarlo al elemento indicado en el id
        const uid = req.params.id;
        const updatedElement = await actualizarImagen(tipo, uid, urlImg);
        if (updatedElement) {
            return res.status(200).json({
                ok: true,
                msg: 'Imagen subida y registro actualizado.',
                name: urlImg
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    fileUpload: fileUpload
}
