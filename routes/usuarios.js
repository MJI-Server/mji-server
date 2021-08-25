/*
****ENDPOINT****
   /api/usuarios
****************
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { getUsuarios, newUsuario, editUsuario, deleteUsuario } = require('../controllers/usuarios');
const { customRol } = require('../custom/custom-rol');
const validarRoles = require('../middlewares/validar-rol');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');


const router = Router();

router.get('/',validarJWT, getUsuarios);
router.post('/',[
    check('email','Ingrese un mail valido').isEmail(),
    check('password','El password es requerido').not().isEmpty(),
    check('usuario','El usuario es requerido').not().isEmpty(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], newUsuario);
router.put('/:id',[
    check('email','Ingrese un mail valido').isEmail(),
    check('usuario','El usuario es requerido').not().isEmpty(),
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], editUsuario);
router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], deleteUsuario);


module.exports = router;
