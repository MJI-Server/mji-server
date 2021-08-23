/*
****ENDPOINT****
   /api/oa
****************
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const { getOA, createOA, updateOA, deleteOA } =  require('../controllers/oa');
const validarJWT = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar-rol');

const router = Router();

router.get('/', getOA);

router.post('/',[
    check('oa','El oa es requerido').not().isEmpty(),
    check('nivel','El nivel es requerido').not().isEmpty(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], createOA);

router.put('/:id',[
    check('oa','El oa es requerido').not().isEmpty(),
    check('nivel','El nivel es requerido').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], updateOA);

router.delete('/:id',[
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarRoles('ADMINISTRADOR'),
    validarCampos
], deleteOA);

module.exports = router;