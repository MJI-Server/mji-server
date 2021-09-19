/*
****ENDPOINT****
   /api/material
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');
const { crearMaterial, actualizarMaterial, eliminarMaterial } = require('../controllers/material');
const { cursoExist, colegioExist, unidadExist } = require('../custom/custom-rol');


const router = Router();


router.post('/',[
    check('idCurso').custom(cursoExist),
    check('idColegio').custom(colegioExist),
    check('idUnidad').custom(unidadExist),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], crearMaterial);

router.put('/:id', [
    check('idCurso').custom(cursoExist),
    check('idColegio').custom(colegioExist),
    check('idUnidad').custom(unidadExist),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], actualizarMaterial);

router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], eliminarMaterial);

module.exports = router;