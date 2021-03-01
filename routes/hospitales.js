/*
    Rutas de los hospitales
    Ruta : /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const controller = require('../controllers/hospitales');

const router = Router();

router.get(
    '/',
    [validarJWT],
    controller.getHospitales
);

// npm i express-validator, para validaciones de los campos
// Enviamos las validaciones como middlewares, no interrumpe el flujo.
// Añade errores que pueden ser tratados a posteriori en el callback
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario.').not().isEmpty(),
        validarCampos,
    ],
    controller.addHospital
);

router.put(
    '/:id',
    [
        validarJWT,
        check('nombre').not().isEmpty(),
        validarCampos,
    ],
    controller.modifyHospital
);

router.delete(
    '/:id',
    [validarJWT],
    controller.deleteHospital
);

module.exports = router;