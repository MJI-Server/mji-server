/*
****ENDPOINT****
   /api/cursoProfesor
****************
*/

const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const { getCursosProfesor, createCursoProfesor, updateCursoProfesor, deleteCursoProfesor, getUsuariosProfesor, getPruebasProfesor, getNotasProfesor } = require('../controllers/cursoProfesor');
const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');

const router = Router();

router.post('/get', [
    check('idUsuario', 'El id del usuario no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR', 'DOCENTE'),
], getCursosProfesor);

router.post('/getUsuarios', [
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR', 'DOCENTE'),
], getUsuariosProfesor);

router.post('/getPruebas', [
    check('idUsuario', 'El id del usuario no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR', 'DOCENTE'),
], getPruebasProfesor);

router.post('/getNotas', [
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    check('idNota', 'El id de la nota no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR', 'DOCENTE'),
], getNotasProfesor);

router.post('/', [
    check('idUsuario', 'El id del usuario no es válido').isMongoId(),
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], createCursoProfesor);

router.put('/:id',[
    check('idUsuario', 'El id del usuario no es válido').isMongoId(),
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], updateCursoProfesor);

router.delete('/:id',[
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], deleteCursoProfesor);

module.exports = router;