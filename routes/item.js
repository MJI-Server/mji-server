/*
****ENDPOINT****
   /api/items
****************
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/item');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');

const router = Router();


router.post('/', [
    check('idEnunciado', 'El id del enunciado no es válido').isMongoId(),
    check('item', 'el item es requerido').not().isEmpty(),
    validarJWT, 
    validarCampos
], createItem);

router.put('/:id', [
    check('item', 'el item es requerido').not().isEmpty(),
    check('id', 'El id no es válido').isMongoId(),
    validarJWT, 
    validarCampos
], updateItem);

router.delete('/:id', [
    check('id', 'El id no es válido').isMongoId(),
    validarJWT, 
    validarCampos
], deleteItem);

module.exports = router;