const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos');

const { getCursos, crearCurso, actualizarCurso, eliminarCurso } = require('../controllers/curso');


const router = Router();

router.get('/', getCursos);

router.post('/',[
    check('letra','La letra del curso es requerida').not().isEmpty(),
    check('curso','El nombre del curso es requerido').not().isEmpty(),
    validarCampos
], crearCurso);

router.put('/:id', [
    check('letra','La letra del curso es requerida').not().isEmpty(),
    check('curso','El nombre del curso es requerido').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    validarCampos
], actualizarCurso);

router.delete('/:id',[
    check('id','El id no es valido').isMongoId(),
    validarCampos
], eliminarCurso);

module.exports = router;