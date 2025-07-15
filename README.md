# Tarea 2.1 continuacion Diseño Digital
Repositorio de la tarea API 
Archivo para crear un proyecto para una api en Node JS:
	
	En la terminal de visual studio escribir: npm init --yes
	
	En la misma terminal instalar node js Express con: npm install express 
	
	En el archivo Index hay que agregar una variable PORT constante para asignar en que puerto va correr el servidor de forma que mi puerto 3000 estaba ocupado utilice el 4000
	
	En el archivo package.json se debe agregar en la parte de scrips lo siguiente ("dev":"node --watch 
	index.js",) para al momento querer iniciar el servidor solo sea neceario escribir en la terminal (npm run dev) que ira a buscar lo que esta alojado en dev y iniciara el servido en el navegador
	
	Ruta: /productos
		Descripción: Obtiene un listado completo de todos los productos registrados en el json.

	Ruta: /productos/disponibles
		Descripción: Muestra solo los productos marcados como disponibles (disponible=true).

	Ruta: /productos/:id
		Descripción: Busca un producto específico usando su ID numérico.

	Ruta: /productos
		Descripción: Agrega un nuevo producto al sistema, para este caso hay un pequeño json en el archivo appi.http en el cual se definen los campos y el producto que va agregarse

	Ruta: /productos/:id
		Descripción: Modifica los datos de un producto existente, asi como en la agregacion de productos estan los campos con el contenido que se va cambiar a los productos
