/*
****ENDPOINT****
   /api/asistencia
****************
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { getAsistencia } = require('../controllers/asistencia');
const validarCampos = require('../middlewares/validarcampos');

const router = Router();

router.post('/getAsistencia',[
    check('idUsuario','El id no es valido').isMongoId(),
    // check('fecha','La fecha es requerida').isDate(),
    validarCampos
], getAsistencia);


module.exports = router;
