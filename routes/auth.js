/*
****ENDPOINT****
   /api/auth
****************
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { register, login, renewJWT } = require('../controllers/auth');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');


const router = Router();

router.post('/',[
    check('email','Ingrese un mail valido').isEmail(),
    check('password','El password es requerido').not().isEmpty(),
    validarCampos
], login);
router.post('/register',[
    check('email','Ingrese un mail valido').isEmail(),
    check('password','El password es requerido').not().isEmpty(),
    check('usuario','El usuario es requerido').not().isEmpty(),
    validarCampos
], register);
router.get('/renew',[
    validarJWT
], renewJWT);


module.exports = router;
