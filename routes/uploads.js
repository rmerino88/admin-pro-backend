/*
    Rutas de los hospitales
    Ruta : /api/hospitales
*/

const { Router } = require('express');
// const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
// const { validarCampos } = require('../middlewares/validar-campos');

const controller = require('../controllers/uploads');

const router = Router();

router.put(
    '/:tipo/:id',
    [validarJWT],
    controller.fileUpload
);

router.get(
    '/:tipo/:img',
    // [validarJWT],
    controller.getImage
);

module.exports = router;