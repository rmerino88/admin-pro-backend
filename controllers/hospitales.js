/*
    Funciones que se van a exportar
    para los callbacks de las llamadas.
*/
// Se recomienda el uso de UpperCamelcase por que se trata de una clase
const Hospital = require('../models/hospital')
const Usuario = require('../models/usuario')
// Para obetener las ayudas del visual studio sobre los objetos res y req
const { response } = require('express');

const getHospitales = async (req, res) => {

    const hospitales = await Hospital.find().populate('usuario','nombre email img');

    res.status(200).json({
        ok: true,
        hospitales: hospitales
    });
};

const addHospital = async (req, res = response) => {
    try {
        
        // const uid = uid;
        // const hospital = new Hospital(req.body);
        // hospital.usuario = uid; 
        const hospital = new Hospital({
            usuario: req.uid,
            ...req.body
        });

        const hospitalDB = await hospital.save();
        
        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: error.message
        });
    }
};

const modifyHospital = async (req, res = response) => {
    
    res.status(200).json({
        ok: true,
        msg: 'modifyHospital: Todo ok'
    });
};

/**
 * Normalemnete más que borrar un registro
 * se recomienda indidcar ele stado con un boolean
 */
const deleteHospital = async (req, res = response) => {
    
    res.status(200).json({
        ok: true,
        msg: 'deleteHospital: Todo ok'
    });
};

module.exports = {
    getHospitales,
    addHospital,
    modifyHospital,
    deleteHospital
};