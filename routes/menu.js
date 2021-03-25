/*
    Rutas de los hospitales
    Ruta : /api/hospitales
*/

const { Router } = require('express');
// const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
// const { validarCampos } = require('../middlewares/validar-campos');

const controller = require('../controllers/menu');

const router = Router();

router.get(
    '',
    [validarJWT],
    controller.getMenu
);


module.exports = router;