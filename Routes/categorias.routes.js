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

//Exportacion del router
export default router;
