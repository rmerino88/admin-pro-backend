/*
    Rutas de login
    Ruta : /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const controller = require('./../controllers/auth');

const router = Router();

router.post(
    '/',
    [
        check('email', 'El email es obligatorio.').isEmail(),
        check('passwd', 'El passwd es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    controller.login);


// Si realizamos el export de esta manera, no compila
// module.exports =  { router };
module.exports = router ;