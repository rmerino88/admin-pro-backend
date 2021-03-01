const { response } = require('express');

const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');

const getTodo = async (req, res = response) => {

    const term = req.params.term;
    const regex = new RegExp(term, 'i');

    const [hospitales, usuarios, medicos] = await Promise.all([
        Hospital.find({ nombre: regex }),
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex })
    ]);

    try {
        return res.status(200).json({
            ok: true,
            msg: 'Todo ok.',
            usuarios,
            medicos,
            hospitales
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const term = req.params.term;

    const regex = new RegExp(term, 'i');
    
    try {
        let data = [];
        switch (tabla) {
            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                .populate('usuario','nombre email img');;
                break;
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                .populate({ path: 'usuario', select: 'nombre email img' })
                .populate({ path: 'hospital', select: 'nombre' });
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla requerida no existe (usuarios/medicos/hospitales)'
                });
        }
        return res.status(200).json({
            ok: true,
            msg: 'Todo ok.',
            resultado: data
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    getTodo,
    getDocumentosColeccion
}
