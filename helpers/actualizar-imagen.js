const fs = require('fs');

const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');


const borrarImagen = async (tipo, nombreArchivo) => {
    const pathViejo = `./uploads/${tipo}/${nombreArchivo}`;
    if (fs.existsSync(pathViejo)) {
        // Borrar la imagen anterior
        fs.unlinkSync(pathViejo);
    }
}

const actualizarImagen = async (tipo, uid, nombreArchivo) => {
    switch (tipo) {
        case 'usuarios':
            const usuarioDB = await Usuario.findById(uid);
            if (!usuarioDB) {
                return false;
            }

            borrarImagen(tipo, usuarioDB.img);

            usuarioDB.img = nombreArchivo;
            // const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, usuarioDB, { new: true });
            // console.log(usuarioActualizado);
            await usuarioDB.save();
            return true;
        case 'hospitales':
            const hospitalDB = await Usuario.findById(uid);
            if (!hospitalDB) {
                return false;
            }

            borrarImagen(tipo, hospitalDB.img);

            hospitalDB.img = nombreArchivo;
            await hospitalDB.save();
            return true;
        case 'medicos':
            const medicoDB = await Medico.findById(uid);
            if (!medicoDB) {
                return false;
            }
            
            borrarImagen(tipo, medicoDB.img);
            
            medicoDB.img = nombreArchivo;
            await medicoDB.save();
            return true;
        default:
            return false;
    }
    return true;
};

module.exports = {
    actualizarImagen
};