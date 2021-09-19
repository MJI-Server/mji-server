/*
****ENDPOINT****
   /api/asistencia
****************
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { newAsistencia, changeAsistencia } = require('../controllers/asistencia');
const { cursoExist, colegioExist } = require('../custom/custom-rol');
const validarRoles = require('../middlewares/validar-rol');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');


const router = Router();

router.post('/',[
    check('idUsuario','El usuario es requerido').not().isEmpty(),
    // check('fecha','La fecha es requerida').isDate(),
    check('idCurso').custom(cursoExist),
    check('idColegio').custom(colegioExist),
    validarCampos
], newAsistencia);

router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], changeAsistencia);


module.exports = router;
