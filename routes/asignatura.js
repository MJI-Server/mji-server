/*
****ENDPOINT****
   /api/asignatura
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const { crearAsignatura, actulizarAsignatura, eliminarAsignatura, getAsignaturas } = require('../controllers/asignatura');
const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');

const router = Router();

router.get('/', [
    validarJWT
], getAsignaturas);
router.post('/', [
    check('grado', 'El id del curso no es válido').not().isEmpty(),
    check('asignatura','La asignatura es requerida').not().isEmpty(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,  
], crearAsignatura);

router.put('/:id', [
    // check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('asignatura','La asignatura es requerida').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], actulizarAsignatura);

router.delete('/:id', [
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], eliminarAsignatura);

module.exports = router;
