/*
    Rutas de los usuarios
    Ruta : /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarAdminRole, validarMismoUsuario, validarModify } = require('../middlewares/validar-modify');

const controller = require('./../controllers/usuarios');
// const { getUsuarios } = require('./../controllers/usuarios');
const { validarCampos } = require('./../middlewares/validar-campos');

const router = Router();

router.get(
    '/',
    [validarJWT],
    controller.getUsuarios
);

// npm i express-validator, para validaciones de los campos
// Enviamos las validaciones como middlewares, no interrumpe el flujo.
// Añade errores que pueden ser tratados a posteriori en el callback
router.post(
    '/',
    [
        check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
        check('passwd').not().isEmpty(),
        check('email', 'El email no cumple el formato esperado.').isEmail(),
        validarCampos,
    ],
    controller.addUsuario
);
 
router.put(
    '/:id',
    [
        validarJWT,
        validarModify,
        check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
        check('email', 'El email no cumple el formato esperado.').isEmail(),
        check('role','El role del usuario es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    controller.modifyUsuario
);

router.delete(
    '/:id',
    [
        validarJWT,
        validarAdminRole
    ],
    controller.deleteUsuario
);

module.exports = router;