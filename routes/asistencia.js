/*
****ENDPOINT****
   /api/asistencia
****************
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { newAsistencia, changeAsistencia, getAsistencia, getAsistenciaAlumnos } = require('../controllers/asistencia');
const { cursoExist, colegioExist } = require('../custom/custom-rol');
const validarRoles = require('../middlewares/validar-rol');
const validarCampos = require('../middlewares/validarcampos');

const router = Router();

router.post('/getAsistencia',[
    check('idUsuario','El id no es valido').isMongoId(),
    // check('fecha','La fecha es requerida').isDate(),
    validarCampos
], getAsistencia);

router.post('/getAsistenciaAlumnos',[
    check('idCurso','El id no es valido').isMongoId(),
    // check('fecha','La fecha es requerida').isDate(),
    validarCampos
], getAsistenciaAlumnos);

router.post('/:id',[
    check('id','El id no es valido').isMongoId(),
    // check('fecha','La fecha es requerida').isDate(),
    validarCampos
], newAsistencia);


module.exports = router;
