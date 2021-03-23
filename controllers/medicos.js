/*
    Funciones que se van a exportar
    para los callbacks de las llamadas.
*/

// Se recomienda el uso de UpperCamelcase por que se trata de una clase
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')
// Para obetener las ayudas del visual studio sobre los objetos res y req
const { response } = require('express');

const getMedico = async (req, res) => {
    
    const uidMedico = req.params.id;
    // Si queremos obtener info de distintos elementos de db asociados..
    const medicoDB = await Medico.findById(uidMedico)
        .populate({ path: 'usuario', select: 'nombre email img' })
        .populate({ path: 'hospital', select: 'nombre img' });
    if (!medicoDB) {
        return res.status(404).json({
            ok: false,
            msg: 'Médico no registrado en BD con ese id.'
        });
    }
    res.status(200).json({
        ok: true,
        medico: medicoDB
    });
};

const getMedicos = async (req, res) => {

    // Si queremos obtener info de distintos elementos de db asociados..
    const medicos = await Medico.find()
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

    const uidMedico = req.params.id;
    const uidUsuario = req.uid;

    const { nombre, hospital: uidHospital } = req.body;

    try {
        // Buscamos un médico en BD con ese id
        const medicoDB = await Medico.findById(uidMedico);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no registrado en BD con ese id.'
            });
        }
        // Buscamos un hospital con el id indicado en el body
        const hospitalDB = await Hospital.findById(uidHospital);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no registrado en BD con ese id.'
            });
        }
        // Actualizaciones
        const medicoActualizado = await Medico.findByIdAndUpdate(
            uidMedico,
            { nombre, usuario: uidUsuario, hospital: uidHospital },
            { new: true }
        );
        return res.status(200).json({
            ok: true,
            medicoActualizado
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: err.message
        });
    }
};

/**
 * Normalemnete más que borrar un registro
 * se recomienda indidcar ele stado con un boolean
 */
const deleteMedico = async (req, res = response) => {
    const uidMedico = req.params.id;
    try {
        // Buscamos un usario en BD con ese id
        const medicoDB = await Medico.findById(uidMedico);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el medico con ese id."
            });

        }
        const resultado = await Medico.findByIdAndDelete(uidMedico);
        return res.status(200).json({
            ok: true,
            uid: uidMedico
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
};

module.exports = {
    getMedico,
    getMedicos,
    addMedico,
    modifyMedico,
    deleteMedico
};