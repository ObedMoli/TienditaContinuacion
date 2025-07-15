import db from '../config/db.js';

export const getAllProductos = async () => {
  const [rows] = await db.query('SELECT * FROM productos');
  return rows;
};

export const getProductoById = async (id) => {
  const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows[0];
};

export const getDisponibles = async () => {
  const [rows] = await db.query('SELECT * FROM productos WHERE disponible = TRUE');
  return rows;
};

export const createProducto = async ({ nombre, precio, descripcion, disponible, categoriaId }) => {
  const [result] = await db.query(
    'INSERT INTO productos (nombre, precio, descripcion, disponible, fecha_ingreso,categoria_id) VALUES (?, ?, ?, ?, NOW(), ?)',
    [nombre, precio, descripcion, disponible, categoriaId]
  );
  return result.insertId;
};

export const updateProducto = async (id, { nombre, precio, descripcion, disponible, categoriaId }) => {
  await db.query(
    'UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, disponible = ?, categoria_id = ? WHERE id = ?',
    [nombre, precio, descripcion, disponible, categoriaId, id]
  );
};

export const deleteProducto = async (id) => {
  await db.query('DELETE FROM productos WHERE id = ?', [id]);
};
