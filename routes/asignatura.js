/*
****ENDPOINT****
   /api/asignatura
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const { getAsignatura, crearAsignatura, actulizarAsignatura, eliminarAsignatura } = require('../controllers/asignatura');

const router = Router();

router.get('/', getAsignatura );

router.post('/', [
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('asignatura','La asignatura es requerida').not().isEmpty(),
    validarCampos
], crearAsignatura);

router.put('/:id', [
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('asignatura','La asignatura es requerida').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    validarCampos
], actulizarAsignatura);

router.delete('/:id', [
    check('id','El id no es válido').isMongoId(),
    validarCampos
], eliminarAsignatura);

module.exports = router;
