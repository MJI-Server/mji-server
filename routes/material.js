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
const { crearMaterial, actualizarMaterial, eliminarMaterial, mostrarMaterial, getMateriales } = require('../controllers/material');
const { validarArchivo } = require('../middlewares/validar-archivo');
const validarJWTDoc = require('../middlewares/validar-jwt-doc');
const { cursoExist, colegioExist, unidadExist, asignaturaExist } = require('../middlewares/validar-materiales');


const router = Router();


router.post('/:idAsignatura/:idCurso',[
    check('idAsignatura','El id de la asignatura no es valido').isMongoId(),
    check('idCurso','El id del curso no es valido').isMongoId(),
    validarJWT,
    validarCampos,
], getMateriales);
router.get('/:conexion/:id',[
], mostrarMaterial);
router.post('/:idColegio/:idCurso/:idAsignatura/:idUnidad',[
    cursoExist,
    asignaturaExist,
    colegioExist,
    unidadExist,
    validarArchivo,
    validarJWT,
    // validarRoles('ADMINISTRADOR'),
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