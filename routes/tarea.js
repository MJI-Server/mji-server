/*
****ENDPOINT****
   /api/tareas
****************
*/
const {Router} = require('express');
const { check } = require('express-validator');
const { isDate } = require('moment');
const { getTareas, createTarea, updateTarea, deleteTarea } = require('../controllers/tarea');
const validarCampos = require('../middlewares/validarcampos');
const validarJWT = require('../middlewares/validarjwt');

const router = Router();

router.get('/',[
    validarJWT
], getTareas);

router.post('/',[
    check('idUnidad', 'El id de la unidad no es válido').isMongoId(),
    check('titulo', 'El título de la tarea es requerido').not().isEmpty(),
    check('subtitle', 'El subtítulo es requerido').not().isEmpty(),
    check('dateInit', 'La fecha de inicio es requerida').custom( isDate ),
    check('dateEnd', 'La fecha de finalización es requerida').custom( isDate ),
    validarJWT,
    validarCampos    
], createTarea);

router.put('/:id',[
    check('idUnidad', 'El id de la unidad no es válido').isMongoId(),
    check('titulo', 'El título de la tarea es requerido').not().isEmpty(),
    check('subtitle', 'El subtítulo es requerido').not().isEmpty(),
    check('dateInit', 'La fecha de inicio es requerida').custom( isDate ),
    check('dateEnd', 'La fecha de finalización es requerida').custom( isDate ),
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarCampos
], updateTarea);

router.delete('/:id',[
    check('id','El id no es válido').isMongoId(),
    validarJWT,
    validarCampos
], deleteTarea);

module.exports = router;