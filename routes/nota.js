/*
****ENDPOINT****
   /api/notas
****************
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { getNotas, createNota, updateNota, deleteNota } = require('../controllers/nota');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');

const router = Router();

router.post('/getNotas',[
    validarJWT
], getNotas)

router.post('/', [
    check('idUsuario','El id del usuario no es válido').isMongoId(),
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    check('nota', 'La nota es requerida').not().isEmpty(),
    validarJWT,
    validarCampos
], createNota)

router.put('/:id', [
    check('idUsuario','El id del usuario no es válido').isMongoId(),
    check('idCurso', 'El id del curso no es válido').isMongoId(),
    check('idAsignatura', 'El id de la asignatura no es válido').isMongoId(),
    check('nota', 'La nota es requerida').not().isEmpty(),
    check('id','El id de la nota no es válido').isMongoId(),
    validarJWT,
    validarCampos
], updateNota)

router.delete('/:id',[
    check('id','El id de la nota no es válido').isMongoId(),
    validarJWT,
    validarCampos
], deleteNota)

module.exports = router;