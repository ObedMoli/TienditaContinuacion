import {
  getAllProductos,
  getProductoById,
  getDisponibles,
  createProducto,
  updateProducto,
  deleteProducto
} from '../models/productos.js';

import { validateProducto } from '../schema/producto.schema.js';

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
      const validacion = validateProducto(req.body);

      if (!validacion.success) {
        const errores = validacion.error.errors.map(e => ({
          campo: e.path.join('.'),
          mensaje: e.message
        }));
        return res.status(400).json({ status: 'Fallido', errores });
      }

      const insertId = await createProducto(validacion.data);
      const nuevoProducto = await getProductoById(insertId);

      res.status(201).json({ status: 'Conexión Exitosa', data: nuevoProducto });
    } catch (error) {
      res.status(500).json({
        status: 'Error',
        message: 'Error al crear el producto',
        error: error.message
      });
    }
  };

  static ActualizarProductos = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ status: 'Fallido', message: 'ID inválido' });

      const existente = await getProductoById(id);
      if (!existente) return res.status(404).json({ status: 'Fallido', message: 'Producto no encontrado' });

      const validacion = validateProducto(req.body);
      if (!validacion.success) {
        const errores = validacion.error.errors.map(e => ({
          campo: e.path.join('.'),
          mensaje: e.message
        }));
        return res.status(400).json({ status: 'Fallido', errores });
      }

      await updateProducto(id, validacion.data);
      const productoActualizado = await getProductoById(id);

      res.status(200).json({ status: 'Actualizado correctamente', data: productoActualizado });
    } catch (error) {
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
