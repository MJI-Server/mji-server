/*
****ENDPOINT****
   /api/tareaAlumno
****************
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { getTareaAlumno, createTareaAlumno } = require('../controllers/tarea_alumno');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');

const router = Router();

router.post('/getTareaAlumno',[
    check('idUsuario', 'El id del usuario no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    validarJWT,
    validarCampos 
], getTareaAlumno);

router.post('/',[
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('idUsuario', 'El id del usuario no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    check('idUnidad', 'El id de la unidad no es válido').isMongoId(),
    check('idTarea', 'El id de la tarea no es válido').isMongoId(),
    validarJWT,
    validarCampos    
], createTareaAlumno);

module.exports = router;