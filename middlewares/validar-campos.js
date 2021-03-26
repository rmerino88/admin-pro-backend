const { response } = require ('express');
const { validationResult } = require('express-validator');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Será llamado en caso de que el middleware pasa,
 * continua el proceso si todo va ok
 */
const validarCampos = (req, res = response, next) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped(),
            msg: 'Errores de validación backend'
        });
    }
    next();
};

module.exports = { validarCampos};