import { Router } from 'express';
import {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  editarCategoria,
  eliminarCategoria
} from '../Controllers/categorias.controllers.js';

const router = Router();

router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoria);
router.post('/', crearCategoria);
router.put('/:id', editarCategoria);
router.delete('/:id', eliminarCategoria);

// 🔴 Esta línea es CRUCIAL
export default router;
