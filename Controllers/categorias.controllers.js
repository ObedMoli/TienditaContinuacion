import {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  categoriaHasProductos
} from '../models/categorias.js';

import { categoriaSchema } from '../schema/categorias.schema.js';
import { z } from 'zod';

export default class CategoriasControllers {

  static getAll = async (req, res) => {
    try {
      const categorias = await getAllCategorias();
      res.status(200).json({ status: 'Conexión Exitosa', data: categorias });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: 'Error al obtener categorías', error: error.message });
    }
  };

  static getById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ status: 'Fallido', message: 'ID inválido' });

      const categoria = await getCategoriaById(id);
      if (!categoria) return res.status(404).json({ status: 'Fallido', message: 'Categoría no encontrada' });

      res.status(200).json({ status: 'Conexión Exitosa', data: categoria });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: 'Error al obtener categoría', error: error.message });
    }
  };

  static crear = async (req, res) => {
    try {
      const { nombre } = categoriaSchema.parse(req.body);
      const nuevaCategoria = await createCategoria(nombre);
      res.status(201).json({ status: 'Conexión Exitosa', data: nuevaCategoria });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ status: 'Fallido', errores: error.errors });
      }
      res.status(500).json({ status: 'Error', message: 'Error al crear categoría', error: error.message });
    }
  };

  static actualizar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ status: 'Fallido', message: 'ID inválido' });

      const existente = await getCategoriaById(id);
      if (!existente) return res.status(404).json({ status: 'Fallido', message: 'Categoría no encontrada' });

      const { nombre } = categoriaSchema.parse(req.body);
      const actualizada = await updateCategoria(id, nombre);

      res.status(200).json({ status: 'Actualizado correctamente', data: actualizada });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ status: 'Fallido', errores: error.errors });
      }
      res.status(500).json({ status: 'Error', message: 'Error al actualizar categoría', error: error.message });
    }
  };

  static eliminar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ status: 'Fallido', message: 'ID inválido' });

      const categoria = await getCategoriaById(id);
      if (!categoria) return res.status(404).json({ status: 'Fallido', message: 'Categoría no encontrada' });

      const tieneProductos = await categoriaHasProductos(id);
      if (tieneProductos) {
        return res.status(400).json({
          status: 'Fallido',
          message: 'No se puede eliminar la categoría porque tiene productos asignados'
        });
      }

      await deleteCategoria(id);
      res.status(200).json({ status: 'Eliminado correctamente', data: categoria });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: 'Error al eliminar categoría', error: error.message });
    }
  };
}
