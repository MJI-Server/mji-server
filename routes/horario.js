/*
****ENDPOINT****
   /api/horario
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');
const { newHorario, editHorario, getHorario } = require('../controllers/horario');


const router = Router();


router.post('/',[
    validarJWT,
    validarRoles('ADMINISTRADOR','DOCENTE'),
    validarCampos
], newHorario);
router.put('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR','DOCENTE'),
    validarCampos,
], editHorario);
router.post('/getHorario',[
    validarJWT,
    validarCampos,
], getHorario);


module.exports = router;