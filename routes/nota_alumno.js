/*
****ENDPOINT****
   /api/notasAlumno
****************
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { getNotasAlumno, createNotaAlumno, updateNotaAlumno, deleteNotaAlumno } = require('../controllers/nota_alumno');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');

const router = Router();

router.post('/getNotasAlumno',[
    // validarJWT
], getNotasAlumno)

router.post('/', [
    check('idNota','El id de la nota no es válida').isMongoId(),
    check('idUsuario','El id del usuario no es válido').isMongoId(),
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    check('nota', 'La nota es requerida').not().isEmpty(),
    // validarJWT,
    validarCampos
], createNotaAlumno)

router.put('/:id', [
    check('idNota','El id de la nota no es válida').isMongoId(),
    check('idUsuario','El id del usuario no es válido').isMongoId(),
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    check('nota', 'La nota es requerida').not().isEmpty(),
    check('id','El id de la nota no es válido').isMongoId(),
    // validarJWT,
    validarCampos
], updateNotaAlumno)

router.delete('/:id',[
    check('id','El id de la nota no es válido').isMongoId(),
    // validarJWT,
    validarCampos
], deleteNotaAlumno)

module.exports = router;