import {
  getAllProductos,
  getProductoById,
  getDisponibles,
  createProducto,
  updateProducto,
  deleteProducto
} from '../models/productos.js';

import { productoSchema } from '../schema/producto.schema.js';
import { z } from 'zod';

export default class ProductosControllers {

  static getAll = async (req, res) => {
    try {
      const productos = await getAllProductos();
      res.status(200).json({ status: 'Conexión Exitosa', data: productos });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: 'Error interno del servidor', error: error.message });
    }
  };

  static ObtenerProductosDisponibles = async (req, res) => {
    try {
      const productos = await getDisponibles();
      res.status(200).json({ status: 'Conexión Exitosa', data: productos });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: 'Error al obtener productos disponibles', error: error.message });
    }
  };

  static ObtenerProductoID = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ status: 'Fallido', message: 'ID inválido' });

      const producto = await getProductoById(id);
      if (!producto) return res.status(404).json({ status: 'Fallido', message: 'Producto no encontrado' });

      res.status(200).json({ status: 'Conexión Exitosa', data: producto });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: 'Error al obtener el producto', error: error.message });
    }
  };

static CrearProducto = async (req, res) => {
  try {
    const datos = productoSchema.parse(req.body); // Zod validación

    const insertId = await createProducto(datos);
    const nuevoProducto = await getProductoById(insertId);

    res.status(201).json({ status: 'Conexión Exitosa', data: nuevoProducto });

  } catch (error) {
    // Zod Error: Mostrar detalles
    if (error instanceof z.ZodError) {
      return res.status(400).json({ status: 'Fallido', errores: error.message });
    }

    // Error inesperado: también mostrar mensaje
    res.status(500).json({
      status: 'Error',
      message: 'Error al crear el producto',
      error: error.message,
    });
  }
};



static ActualizarProductos = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ status: 'Fallido', message: 'ID inválido' });

    const existente = await getProductoById(id);
    if (!existente) return res.status(404).json({ status: 'Fallido', message: 'Producto no encontrado' });

    const datos = productoSchema.parse(req.body);
    await updateProducto(id, datos);

    const productoActualizado = await getProductoById(id);
    res.status(200).json({ status: 'Actualizado correctamente', data: productoActualizado });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ status: 'Fallido', errores: error.errors });
    }
    res.status(500).json({ status: 'Error', message: 'Error al actualizar el producto', error: error.message });
  }
};

  static EliminarProducto = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ status: 'Fallido', message: 'ID inválido' });

      const producto = await getProductoById(id);
      if (!producto) return res.status(404).json({ status: 'Fallido', message: 'Producto no encontrado' });

      await deleteProducto(id);
      res.status(200).json({ status: 'Eliminado correctamente', data: producto });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: 'Error al eliminar el producto', error: error.message });
    }
  };
}
