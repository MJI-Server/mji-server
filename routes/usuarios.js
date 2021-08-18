/*
****ENDPOINT****
   /api/usuarios
****************
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { getUsuarios, newUsuario, editUsuario, deleteUsuario } = require('../controllers/usuarios');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');


const router = Router();

router.get('/',validarJWT, getUsuarios);
router.post('/',[
    check('email','Ingrese un mail valido').isEmail(),
    check('password','El password es requerido').not().isEmpty(),
    check('usuario','El usuario es requerido').not().isEmpty(),
    validarJWT,
    validarCampos
], newUsuario);
router.put('/:id',[
    check('email','Ingrese un mail valido').isEmail(),
    check('password','El password es requerido').not().isEmpty(),
    check('usuario','El usuario es requerido').not().isEmpty(),
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarCampos
], editUsuario);
router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarJWT,
    validarCampos
], deleteUsuario);


module.exports = router;
