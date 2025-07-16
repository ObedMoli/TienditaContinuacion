# Tarea 2.1 continuacion Diseño Digital
Repositorio de la tarea API 
Archivo para crear un proyecto para una api en Node JS:
	
	En la terminal de visual studio escribir: npm init --yes
	
	En la misma terminal instalar node js Express con: npm install express 
	En el archivo Index hay que agregar una variable PORT constante para asignar en que puerto va correr el 
	servidor de forma que mi puerto 3000 estaba ocupado utilice el 5000
	Se han agregado varias dependencias y se necesitan instalar para que funcione estan son las siguientes:

	npm install zod
	npm install node
	npm install dotenv
	npm install mysql2
	Y tener instalado y corriendo el docker con el servidor de base de datos
	cambiar la extension del archivo env.structure a .env y completar con los datos correspondiente

	Ruta: /productos
		Descripción: Obtiene un listado completo de todos los productos registrados en la base de datos.

	Ruta: /productos/disponibles
		Descripción: Muestra solo los productos marcados como disponibles (disponible=true).

	Ruta: /productos/:id
		Descripción: Busca un producto específico usando su ID numérico.

	Ruta: /productos
		Descripción: Agrega un nuevo producto a la  base de datos

	Ruta: /productos/:id
		Descripción: Modifica los datos de un producto existente, asi como en la agregacion de productos estan los campos con el contenido que se va cambiar a los productos

	CATEGORIAS	
	Ruta: /categorias
		Método: GET
		Descripción: Devuelve una lista de todas las categorías registradas en la base de datos.

	Ruta: /categorias/:id
		Método: GET
		Descripción: Devuelve la información de una categoría específica por su ID.

	Ruta: /categorias/crear
		Método: POST
		Descripción: Crea una nueva categoría.
		Campos esperados en el cuerpo de la solicitud (Content-Type: application/json):
		json
		Copiar
		Editar
		{
		"nombre": "Electrónica"
		}
		nombre: (string) requerido y debe ser único. No se permiten campos vacíos.

	Ruta: /categorias/:id
	Método: PUT
		Descripción: Modifica los datos de una categoría existente.
		Campos que pueden enviarse en el cuerpo de la solicitud:
		nombre: (string) nuevo nombre para la categoría. Requerido. No debe repetirse con otro nombre ya existente.

	Ruta: /categorias/:id
		Método: DELETE
		Descripción: Elimina una categoría específica.
		Condición especial: No se permite eliminar la categoría si tiene productos asignados.