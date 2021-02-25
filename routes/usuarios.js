/*
    Rutas de los usuarios
    Ruta : /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

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
        check('nombre').not().isEmpty(),
        check('passwd').not().isEmpty(),
        check('email').isEmail(),
        validarCampos,
    ],
    controller.addUsuario
);

router.put(
    '/:id',
    [
        check('nombre').not().isEmpty(),
        check('email').isEmail(),
        check('role').not().isEmpty(),
        validarCampos,
    ],
    controller.modifyUsuario
);

router.delete(
    '/:id',
    [],
    controller.deleteUsuario
);

module.exports = router;