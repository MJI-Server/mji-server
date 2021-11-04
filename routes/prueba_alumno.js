/*
****ENDPOINT****
   /api/pruebaAlumno
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');
const { validarArchivo } = require('../middlewares/validar-archivo');
const { cursoExist, colegioExist, unidadExist, asignaturaExist } = require('../middlewares/validar-materiales');
const { getPruebasAlumno, mostrarPruebaAlumno, ingresarPrueba, actualizaPruebaAlumno, eliminarPruebaAlumno } = require('../controllers/prueba_alumno');


const router = Router();


router.post('/:idPrueba',[
    check('idPrueba','El id del la prueba no es valido').isMongoId(),
    validarJWT,
    validarCampos,
], getPruebasAlumno);
router.get('/:conexion/:id',[
], mostrarPruebaAlumno);
router.post('/:idCurso/:idAsignatura/:idUnidad/:idPrueba',[
    validarJWT,
    cursoExist,
    asignaturaExist,
    colegioExist,
    unidadExist,
    validarArchivo,
    validarRoles('ADMINISTRADOR','USUARIO'),
    validarCampos,
], ingresarPrueba);

router.put('/:id', [
    validarJWT,
    validarArchivo,
    validarRoles('ADMINISTRADOR','USUARIO'),
    validarCampos,
], actualizaPruebaAlumno);

router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR','USUARIO'),
    validarCampos,
], eliminarPruebaAlumno);

module.exports = router;