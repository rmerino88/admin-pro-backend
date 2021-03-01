/*
    Funciones que se van a exportar
    para los callbacks de las llamadas.
*/

// Se recomienda el uso de UpperCamelcase por que se trata de una clase
const Medico = require('../models/medico')
// Para obetener las ayudas del visual studio sobre los objetos res y req
const { response } = require('express');

const getMedicos = async (req, res) => {

    // Si queremos obtener info de distintos elementos de db asociados..
    const medicos =await Medico.find()
        .populate({ path: 'usuario', select: 'nombre email img' })
        .populate({ path: 'hospital', select: 'nombre' });
        
    res.status(200).json({
        ok: true,
        medicos
    });
};

const addMedico = async (req, res = response) => {
    try {
        const medico = new Medico({
            usuario: req.uid,
            ...req.body
        });

        const medicoDB = await medico.save();
        
        res.status(200).json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: error.message
        });
    }

};

const modifyMedico = async (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'modifyMedico: Todo ok'
    });
};

/**
 * Normalemnete más que borrar un registro
 * se recomienda indidcar ele stado con un boolean
 */
const deleteMedico = async (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'deleteMedico: Todo ok'
    });
};

module.exports = {
    getMedicos,
    addMedico,
    modifyMedico,
    deleteMedico
};