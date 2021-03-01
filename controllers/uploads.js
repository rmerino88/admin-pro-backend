const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const { actualizarImagen } = require('../helpers/actualizar-imagen')

const getImage = async (req, res = response) => {

    const tipo = req.params.tipo;
    const img = req.params.img;

    let pathImage = path.join( __dirname, `../uploads/${tipo}/${img}`);
    // console.log('__dirname', __dirname);
    if ( !fs.existsSync(pathImage) ) {
        pathImage = path.join( __dirname, `../uploads/Image-Not-Available.png`);
    }
    res.sendFile(pathImage);
};

const fileUpload = async (req, res = response) => {

    try {

        //Validar el tipo
        const tiposValidos = ['hospitales', 'usuarios', 'medicos'];
        const tipo = req.params.tipo;
        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({
                ok: false,
                msg: 'El tipo seleccionado no es de tipo usuarios,medicos u hospitales'
            });
        }

        // Validar que existe un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No se adjuntaron archivos.'
            });
        }

        // Procesar la imagen
        const file = req.files.imagen;
        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
        const extensionesValidos = ['jpeg', 'jpg', 'png', 'gif'];
        if (!extensionesValidos.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: 'El tipo de la imagen seleccionada no está permitida.'
            });
        }

        // Generar el nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

        // Path para guardar la imagen
        const path = `./uploads/${tipo}/${nombreArchivo}`;

        // Use the mv() method to place the file somewhere on your server
        file.mv(path, (err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msg: err.message
                });
            }
            // return res.status(200).json({
            //     ok: true,
            //     msg: 'Fichero subido.',
            //     nombreArchivo
            // });
        });

        // Asignarlo al elemento indicado en el id
        const uid = req.params.id;
        const updatedElement = await actualizarImagen(tipo, uid, nombreArchivo);
        if (updatedElement) {
            return res.status(200).json({
                ok: true,
                msg: 'Imagen subida y registro actualizado.'
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
    fileUpload: fileUpload,
    getImage
}
