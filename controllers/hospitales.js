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
            ok: false,
            msg: error.message
        });
    }
};

const modifyHospital = async (req, res = response) => {
    
    const idHospital = req.params.id;
    const uidUsuario = req.uid;

    const nombre = req.body.nombre;
    try {
        // Buscamos un hospital en BD con ese id
        const hospitalDB = await Hospital.findById(idHospital);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no registrado en BD con ese id.'
            });
        }
        // Actualizaciones
        if (hospitalDB.nombre !== nombre) {
            // Buscamos en BD registros con ese nombre
            const existeNombre = await Hospital.findOne({ nombre });
            if (existeNombre) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Nombre de hospital ya registrado.'
                });
            }
            const hospital = await Hospital.findByIdAndUpdate(idHospital, { nombre, usuario:uidUsuario }, { new: true });
            // hospitalDB.nombre = nombre;
            // hospitalDB.save();
            return res.status(200).json({
                ok: true,
                hospital
            });
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'No se ha realizado la modificación, mismo nombre.'
            });
        }

    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: err.message
        });
    }
};

/**
 * Normalmente más que borrar un registro
 * se recomienda indicar el estado con un boolean
 */
const deleteHospital = async (req, res = response) => {
    const uidHospital = req.params.id;
    try {
        // Buscamos un usario en BD con ese id
        const hospitalDB = await Hospital.findById(uidHospital);
        if(!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el hospital con ese id."
            });
            
        }
        await Hospital.findByIdAndDelete(uidHospital);
        return res.status(200).json({
            ok: true,
            uid: uidHospital
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
};

module.exports = {
    getHospitales,
    addHospital,
    modifyHospital,
    deleteHospital
};