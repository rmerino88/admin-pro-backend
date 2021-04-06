/*
    Rutas para la subida de images de cloudinary
    Ruta : /api/image
*/

const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const controller = require('../controllers/images');

const router = Router();

router.put(
    '/:tipo/:id',
    [
        validarJWT,
        check('urlImg', 'La url de la imagen debe estar informada.').not().isEmpty(),
        validarCampos
    ],
    controller.fileUpload
);

module.exports = router;