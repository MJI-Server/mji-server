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
const { cursoExist, unidadExist, asignaturaExist } = require('../middlewares/validar-materiales');
const { getPruebas, crearPrueba, actualizarPrueba, eliminarPrueba } = require('../controllers/prueba');


const router = Router();


router.post('/:idCurso/:idAsignatura/',[
    check('idAsignatura','El id de la asignatura no es valido').isMongoId(),
    check('idCurso','El id del curso no es valido').isMongoId(),
    validarJWT,
    validarCampos,
], getPruebas);

router.post('/newPrueba/:idCurso/:idAsignatura/:idUnidad',[
    unidadExist,
    cursoExist,
    asignaturaExist,
    validarJWT,
    validarRoles('DOCENTE','ADMINISTRADOR'),
    validarCampos,
], crearPrueba);

router.put('/:id', [
    validarJWT,
    validarRoles('DOCENTE','ADMINISTRADOR'),
    validarCampos,
], actualizarPrueba);

router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('DOCENTE','ADMINISTRADOR'),
    validarCampos,
], eliminarPrueba);

module.exports = router;