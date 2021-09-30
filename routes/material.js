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
const { crearMaterial, actualizarMaterial, eliminarMaterial, mostrarMaterial } = require('../controllers/material');
const { cursoExist, colegioExist, unidadExist } = require('../custom/custom-rol');
const { validarArchivo } = require('../middlewares/validar-archivo');


const router = Router();


router.post('/getMaterial',[
    check('idCurso').custom(cursoExist),
    check('idColegio').custom(colegioExist),
    check('idUnidad').custom(unidadExist),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], mostrarMaterial);
router.post('/:idColegio/:idCurso/:idUnidad',[
    check('idCurso').custom(cursoExist),
    check('idColegio').custom(colegioExist),
    check('idUnidad').custom(unidadExist),
    validarArchivo,
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos,
], crearMaterial);

router.put('/:id', [
    validarJWT,
    validarArchivo,
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