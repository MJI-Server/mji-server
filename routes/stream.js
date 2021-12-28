/*
****ENDPOINT****
/api/stream
****************
*/
const { createServer } = require("../controllers/stream");
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');



const router = Router();


router.post('/',[
    validarJWT,
    validarRoles('DOCENTE','ADMINISTRADOR'),
    validarCampos
], createServer);


module.exports = router;