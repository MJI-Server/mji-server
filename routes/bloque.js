/*
****ENDPOINT****
   /api/bloque
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');
const { newBloque, editBloque, deleteBloque } = require('../controllers/bloque');


const router = Router();


router.post('/',[
    validarJWT,
    check('idCurso','El id no es valido').not().isEmpty(),
    check('idUsuario','El id no es valido').not().isEmpty(),
    check('idAsignatura','El id no es valido').not().isEmpty(),
    validarRoles('ADMINISTRADOR','DOCENTE'),
    validarCampos
], newBloque);
router.put('/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('idCurso','El id no es valido').not().isEmpty(),
    check('idUsuario','El id no es valido').not().isEmpty(),
    check('idAsignatura','El id no es valido').not().isEmpty(),
    validarRoles('ADMINISTRADOR','DOCENTE'),
    validarCampos,
], editBloque);
router.delete('/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    validarRoles('ADMINISTRADOR','DOCENTE'),
    validarCampos,
], deleteBloque);


module.exports = router;