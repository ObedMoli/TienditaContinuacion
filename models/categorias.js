import db from '../config/db.js';

export const getAllCategorias = async () => {
  const [rows] = await db.query('SELECT * FROM categorias');
  return rows;
};

export const getCategoriaById = async (id) => {
  const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
  return rows[0];
};

export const createCategoria = async (nombre) => {
  const [result] = await db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
  return { id: result.insertId, nombre };
};

export const updateCategoria = async (id, nombre) => {
  await db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
  return { id, nombre };
};

export const deleteCategoria = async (id) => {
  await db.query('DELETE FROM categorias WHERE id = ?', [id]);
};

export const categoriaHasProductos = async (id) => {
  const [rows] = await db.query('SELECT COUNT(*) AS total FROM productos WHERE categoria_id = ?', [id]);
  return rows[0].total > 0;
};

export const categoriaExists = async (nombre) => {
  const [rows] = await db.query('SELECT * FROM categorias WHERE nombre = ?', [nombre]);
  return rows.length > 0;
};
