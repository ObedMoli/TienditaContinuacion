import { Router } from 'express';
import CategoriasController from '../Controllers/categorias.controllers.js';


const router = Router();

router.get('/', CategoriasController.getAll);
router.get('/:id', CategoriasController.getById);
router.post('/crear', CategoriasController.crear);
router.put('/:id', CategoriasController.actualizar);
router.delete('/:id', CategoriasController.eliminar);

export default router;
