/*
****ENDPOINT****
/api/stream
****************
*/
const { createServer, getStream, deleteStream } = require("../controllers/stream");
const { Router } = require('express');
const validarCampos = require('../middlewares/validarcampos');

const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');



const router = Router();


router.post('/',[
    validarJWT,
    validarRoles('DOCENTE','ADMINISTRADOR'),
    validarCampos
], createServer);

router.post('/getStream',[
    validarJWT,
    validarCampos
], getStream);

router.delete('/',[
    validarJWT,
    validarRoles('DOCENTE','ADMINISTRADOR'),
    validarCampos
], deleteStream);


module.exports = router;