import data from '../Db_JsonTienda/Productos.json' with {type: 'json'}
const productos = data.productos;
export default class ProductosControllers{


     static getAll = (req, res) => {
        try {
            res.status(200).json({
                status: 'Conexion Exitosa',
                data: productos
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    };
//Devuelve los productos marcados como disponibles
  static ObtenerProductosDisponibles = (req, res) => {
        try {
            const disponibles = productos.filter(producto => producto.disponible === true)
            res.status(200).json({
                status: 'Conexion Exitosa',
                data: disponibles
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error al obtener productos disponibles',
                error: error.message
            });
        }
    };
       static ObtenerProductoID = (req, res) => {
        try {
            const { id } = req.params;
            const parsedId = Number(id);            
            if (isNaN(parsedId)) {
                return res.status(400).json({
                    status: 'Fallido',
                    message: 'El ID debe ser un número válido',
                    received: id,
                });
            }
            const producto = productos.find(p => p.id === parsedId)
            
            if (!producto) {
                return res.status(404).json({
                    status: 'Fallido',
                    message: 'Producto no encontrado',
                    id: parsedId,
                    suggestion: 'Verifique el ID e intente nuevamente',
                });
            }
            res.status(200).json({
                status: 'Conexion Exitosa',
                data: producto,
                
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error al obtener el producto',
                error: error.message,
            });
        }
    }; 

// Crear un nuevo producto
   static CrearProducto = (req, res) => {
        try {
            const { nombre, precio, categoria, descripcion, disponible } = req.body

            // Validación de campos obligatorios
            if (!nombre || precio === undefined || !categoria || !descripcion || disponible === undefined) {
                return res.status(400).json({
                    status: 'Fallido',
                    message: 'Todos los campos son requeridos',
                    requiredFields: ['nombre', 'precio', 'categoria', 'descripcion', 'disponible'],

                });
            }

            // Validación nombre no vacío
            if (nombre.trim() === '') {
                return res.status(400).json({
                    status: 'Fallido',
                    message: 'El nombre no puede estar vacío',
                    
                });
            }

            // Validación precio positivo
            const precioNum = parseFloat(precio)
            if (isNaN(precioNum)) {
                return res.status(400).json({
                    status: 'Fallido',
                    message: 'El precio debe ser un número válido',
                    received: precio,
                    
                });
            }
            if (precioNum <= 0) {
                return res.status(400).json({
                    status: 'Fallido',
                    message: 'El precio debe ser mayor a cero',
                    received: precio,
                });
            }

            // Validación longitud descripción
            if (descripcion.length < 10) {
                return res.status(400).json({
                    status: 'Fallido',
                    message: 'La descripción debe tener al menos 10 caracteres',
                    receivedLength: descripcion.length,
                    requiredLength: 10,
                });
            }

            const nuevoProducto = {
                id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
                nombre: nombre.trim(),
                precio: precioNum,
                categoria,
                descripcion,
                disponible,
                fecha_ingreso: new Date().toISOString()
            };

            productos.push(nuevoProducto)
            res.status(201).json({
                status: 'Conexion Exitosa',
                data: nuevoProducto,
                
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error al crear el producto',
                error: error.message,

            });
        }
    };
  // Actualizar un producto existente
  static ActualizarProductos = (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const { nombre, precio, categoria, descripcion, disponible } = req.body;

            // Validar ID
            if (isNaN(id)) {
                return res.status(400).json({
                    status: 'fallido',
                    message: 'El ID debe ser un número válido',
                    received: req.params.id,
                });
            }

            // Buscar producto
            const productoIndex = productos.findIndex(p => p.id === id)
            if (productoIndex === -1) {
                return res.status(404).json({
                    status: 'Fallido',
                    message: 'Producto no encontrado',
                    id,
                    suggestion: 'Verifique el ID del producto',
                    
                });
            }

            // Validaciones para campos actualizados
            if (nombre !== undefined && nombre.trim() === '') {
                return res.status(400).json({
                    status: 'Fallido',
                    message: 'El nombre no puede estar vacío',
                   
                });
            }

            if (precio !== undefined) {
                const precioNum = parseFloat(precio)
                if (isNaN(precioNum)) {
                    return res.status(400).json({
                        status: 'Fallido',
                        message: 'El precio debe ser un número válido',
                        received: precio,
                        
                    });
                }
                if (precioNum <= 0) {
                    return res.status(400).json({
                        status: 'Fallido',
                        message: 'El precio debe ser mayor a cero',
                        received: precio,
                       
                    });
                }
            }

            if (descripcion !== undefined && descripcion.length < 10) {
                return res.status(400).json({
                    status: 'Fallido',
                    message: 'La descripción debe tener al menos 10 caracteres',
                    receivedLength: descripcion.length,
                    requiredLength: 10
                   
                });
            }

            // Actualizar producto
            const productoActualizado = {
                ...productos[productoIndex],
                nombre: nombre !== undefined ? nombre.trim() : productos[productoIndex].nombre,
                precio: precio !== undefined ? parseFloat(precio) : productos[productoIndex].precio,
                categoria: categoria !== undefined ? categoria : productos[productoIndex].categoria,
                descripcion: descripcion !== undefined ? descripcion : productos[productoIndex].descripcion,
                disponible: disponible !== undefined ? disponible : productos[productoIndex].disponible
            };

            productos[productoIndex] = productoActualizado
            res.status(200).json({
                status: 'Conexion Exitosa',
                data: productoActualizado,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error al actualizar el producto',
                error: error.message,
                
            });
        }
    };
  // Eliminar un producto
   static EliminarProducto = (req, res) => {
        try {
            const id = parseInt(req.params.id)
            
            if (isNaN(id)) {
                return res.status(400).json({
                    status: 'Fallido',
                    message: 'El ID debe ser un número válido',
                    received: req.params.id,
                   
                });
            }

            const index = productos.findIndex(p => p.id === id)
            
            if (index === -1) {
                return res.status(404).json({
                    status: 'Fallido',
                    message: 'Producto no encontrado',
                    id,
                    suggestion: 'Verifique el ID del producto',
                    
                });
            }

            const productoEliminado = productos[index]
            productos.splice(index, 1)
            
            res.status(200).json({
                status: 'Conexion Exitosa',
                message: 'Producto eliminado correctamente',
                data: productoEliminado,
                
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error al eliminar el producto',
                error: error.message,
                
            });
        }
    };
}

