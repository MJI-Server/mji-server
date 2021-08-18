const { Router } = require('express');

const { getCursos, crearCurso, actualizarCurso, eliminarCurso } = require('../controllers/curso');


const router = Router();

router.get('/', getCursos);

router.post('/', crearCurso);

router.put('/:id', actualizarCurso);

router.delete('/:id', eliminarCurso);

module.exports = router;