import express from 'express'
import ProductosRouter from './Routes/productos.routes.js'

//Codigo para verificacion del puerto servidor y usar express
const app=express()
const PORT=process.env.PORT || 4000
//Probar en que puerto esta escuchando el servidor
app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en el puerto http://localhost:${PORT}`);
})  

//Codigo para usar las rutas 
app.use(express.json())
app.use('/productos',ProductosRouter)
