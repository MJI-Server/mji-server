/*
****ENDPOINT****
   /api/unidad
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const { getUnidades, createUnidades, updatetUnidades, deleteUnidades } = require('../controllers/unidad');
const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');

const router = Router();

router.get('/', getUnidades );

router.post('/', [
    // check('idAsignatura', 'El id de la Asignatura no es válido').isMongoId(),
    check('unidad','La unidad es requerida').not().isEmpty(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], createUnidades);

router.put('/:id', [
    // check('idAsignatura', 'El id de la Asignatura no es válido').isMongoId(),
    check('unidad','La unidad es requerida').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], updatetUnidades);

router.delete('/:id', [
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], deleteUnidades);

module.exports = router;