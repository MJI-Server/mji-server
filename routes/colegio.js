/*
****ENDPOINT****
   /api/colegio
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');
const { getColegios, crearColegio, actualizarColegio, eliminarColegio } = require('../controllers/colegio');


const router = Router();

router.get('/', getColegios);

router.post('/',[
    check('rbd','La letra del curso es requerida').not().isEmpty(),
    check('nombre','El nombre del curso es requerido').not().isEmpty(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], crearColegio);

router.put('/:id', [
    check('rbd','La letra del curso es requerida').not().isEmpty(),
    check('nombre','El nombre del curso es requerido').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], actualizarColegio);

router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], eliminarColegio);

module.exports = router;