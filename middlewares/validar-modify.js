const { response } = require('express');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarAdminRole = async (req, res = response, next) => {
    try {

        const uid = req.uid;
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no existe.',
            });
        }
        if (usuario.role === 'ADMIN_ROLE') {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no tiene permisos para realizar esta acción.',
            });
        }
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: error,
        });
    }
};

const validarModify = async (req, res = response, next) => {
    try {
        // Usuario del body, el que va aser modificado
        const { email } = req.body;
        const usuarioBody = await Usuario.findOne({ email });
        // Usuario del token, el que realiza la acción
        const uid = req.uid;
        const usuarioToken = await Usuario.findById(uid);

        if (!usuarioToken) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no existe.',
            });
        }

        if (usuarioToken.role === 'ADMIN_ROLE' || usuarioToken.equals(usuarioBody)) {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no tiene permisos para realizar esta acción.',
            });
        }
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: error,
        });
    }
};

const validarMismoUsuario = async (req, res = response, next) => {

    try {

        const { email } = req.body;
        const usuarioBody = await Usuario.findOne({ email });
        const uid = req.uid;
        const usuarioToken = await Usuario.findById(uid);

        if (!usuarioToken) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no existe.',
            });
        }

        // if (usuarioToken_id.equals(usuarioBody._id)) {
        if (usuarioToken.equals(usuarioBody)) {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no tiene permisos para modificar un usuario distinto del suyo.',
            });
        }
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: error,
        });
    }
};

module.exports = {
    validarModify,
    validarAdminRole,
    validarMismoUsuario
};