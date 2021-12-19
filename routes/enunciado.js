/*
****ENDPOINT****
   /api/enunciados
****************
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { createEnunciado, updateEnunciado, deleteEnunciado } = require('../controllers/enunciado');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');

const router = Router();


router.post('/', [
    check('idTarea', 'El id no es válido').isMongoId(),
    check('enunciado', 'El enunciado es requerido').not().isEmpty(),
    validarJWT,
    validarCampos
], createEnunciado);

router.put('/:id', [
    check('idTarea', 'El id de la tarea no es válido').isMongoId(),
    check('enunciado', 'El enunciado es requerido').not().isEmpty(),
    validarJWT,
    validarCampos
], updateEnunciado);

router.delete('/:id', [
    check('id', 'El id no es válido').isMongoId(),
    validarJWT,
    validarCampos
], deleteEnunciado);

module.exports = router;