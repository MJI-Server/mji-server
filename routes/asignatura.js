const { Router } = require('express');
const { getAsignatura, crearAsignatura, actulizarAsignatura, eliminarAsignatura } = require('../controllers/asignatura');

const router = Router();

router.get('/', getAsignatura );

router.post('/', crearAsignatura);

router.put('/:id', actulizarAsignatura);

router.delete('/:id', eliminarAsignatura);

module.exports = router;
