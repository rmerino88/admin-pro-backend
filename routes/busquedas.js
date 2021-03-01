/*
    Rutas de los hospitales
    Ruta : /api/hospitales
*/

const { Router } = require('express');
// const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
// const { validarCampos } = require('../middlewares/validar-campos');

const controller = require('../controllers/busquedas');

const router = Router();

router.get(
    '/:term',
    [validarJWT],
    controller.getTodo
);

router.get(
    '/busquedaPorColleccion/:tabla/:term',
    [validarJWT],
    controller.getDocumentosColeccion
);

module.exports = router;