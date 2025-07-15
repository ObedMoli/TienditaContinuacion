import {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  categoriaHasProductos,
  categoriaExists
} from '../models/categorias.js';
import { z } from 'zod';

const nombreSchema = z.string().min(1, 'Nombre es requerido');

export const obtenerCategorias = async (req, res) => {
  const categorias = await getAllCategorias();
  res.json(categorias);
};

export const obtenerCategoria = async (req, res) => {
  const categoria = await getCategoriaById(req.params.id);
  if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
  res.json(categoria);
};

export const crearCategoria = async (req, res) => {
  try {
    const nombre = nombreSchema.parse(req.body.nombre);
    const existe = await categoriaExists(nombre);
    if (existe) return res.status(400).json({ error: 'La categoría ya existe' });

    const nuevaCategoria = await createCategoria(nombre);
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const editarCategoria = async (req, res) => {
  try {
    const nombre = nombreSchema.parse(req.body.nombre);
    const categoria = await getCategoriaById(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

    const actualizada = await updateCategoria(req.params.id, nombre);
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const eliminarCategoria = async (req, res) => {
  const tieneProductos = await categoriaHasProductos(req.params.id);
  if (tieneProductos) return res.status(400).json({ error: 'No se puede eliminar, categoría con productos asignados' });

  await deleteCategoria(req.params.id);
  res.json({ mensaje: 'Categoría eliminada' });
};
