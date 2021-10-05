/*
****ENDPOINT****
   /api/curso
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const { getCursos, crearCurso, actualizarCurso, eliminarCurso } = require('../controllers/curso');
const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');


const router = Router();

router.post('/get',validarJWT, getCursos);

router.post('/',[
    check('letra','La letra del curso es requerida').not().isEmpty(),
    check('curso','El nombre del curso es requerido').not().isEmpty(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], crearCurso);

router.put('/:id', [
    check('letra','La letra del curso es requerida').not().isEmpty(),
    check('curso','El nombre del curso es requerido').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], actualizarCurso);

router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], eliminarCurso);

module.exports = router;