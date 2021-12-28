const {Router} = require('express');
const { check } = require('express-validator');
const { newAsistencia, changeAsistencia, getAsistencia } = require('../controllers/asistenciaProfesor');
const validarRoles = require('../middlewares/validar-rol');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');

const router = Router();

router.post('/', [
    check('idCurso', 'El idCurso no es valido').isMongoId(),
    validarCampos
], getAsistencia)

router.post('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR','DOCENTE'),
    // check('fecha','La fecha es requerida').isDate(),
    validarCampos
], newAsistencia);

router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR','DONCENTE'),
    validarCampos
], changeAsistencia);

module.exports = router;