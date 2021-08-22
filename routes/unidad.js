/*
****ENDPOINT****
   /api/unidad
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const { getUnidades, createUnidades, updatetUnidades, deleteUnidades } = require('../controllers/unidad');

const router = Router();

router.get('/', getUnidades );

router.post('/', [
    check('idAsignatura', 'El id de la Asignatura no es válido').isMongoId(),
    check('unidad','La unidad es requerida').not().isEmpty(),
    validarCampos
], createUnidades);

router.put('/:id', [
    check('idAsignatura', 'El id de la Asignatura no es válido').isMongoId(),
    check('unidad','La unidad es requerida').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    validarCampos
], updatetUnidades);

router.delete('/:id', [
    check('id','El id no es válido').isMongoId(),
    validarCampos
], deleteUnidades);

module.exports = router;