/*
    Rutas de los medicos
    Ruta : /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const controller = require('../controllers/medicos');

const router = Router();

router.get(
    '/',
    [],
    controller.getMedicos
);
router.get(
    '/:id',
    [validarJWT],
    controller.getMedico
);

router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario.').not().isEmpty(),
        check('hospital', 'El medico debe pertenecer a un hospital.').not().isEmpty(),
        check('hospital', 'El id del hospital debe de ser válido.').isMongoId(),
        validarCampos,
    ],
    controller.addMedico
);

router.put(
    '/:id',
    [validarJWT],
    controller.modifyMedico
);

router.delete(
    '/:id',
    [validarJWT],
    controller.deleteMedico
);

module.exports = router;