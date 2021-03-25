const { response } = require('express');
// const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Será llamado en caso de que el middleware pasa,
 * continua el proceso si todo va ok
 */
const validarJWT = async (req, res = response, next) => {
    // Leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion.'
        });
    }
    try {

        // const result = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // El resultado de la llamada verufyes como la siguiente
        // { uid: '60376234f9e4ac204cb6c4a4', iat: 1614246840, exp: 1614290040 }

        const { uid } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Si el token no es válido salta un error que recoge el catch
        // if(!uid){
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'Token inválido.'
        //     });
        // }

        /**
         * Al tener el uid sabemos quien es el usuario que realiza la consulta,
         * que de otra manera de momento no lo teníamos.
         * Lo seteamos en la request para poder hacer uso de el en los sigueientes pasos.
         */

        req.uid = uid;
        if (uid) {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'uid no encontrado para el token enviado.',
                token
            });
        }
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto/inválido.',
            token
        });
    }
};


module.exports = {
    validarJWT
};