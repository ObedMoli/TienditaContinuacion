import { Router } from 'express'
import ProductosController from '../Controllers/productos.controllers.js'


const ProductosRouter= Router()

ProductosRouter.get('/',(req,res)=>{
    ProductosController.getAll(req,res)
})
ProductosRouter.get('/Disponible/', ProductosController.ObtenerProductosDisponibles)
ProductosRouter.get('/:id', ProductosController.ObtenerProductoID)

ProductosRouter.post('/', ProductosController.CrearProducto)
ProductosRouter.delete('/:id', ProductosController.EliminarProducto)
ProductosRouter.put('/:id', ProductosController.ActualizarProductos)




export default ProductosRouter