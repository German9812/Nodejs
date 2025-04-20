# API REST de Usuarios con Node.js, Express y MySQL

Este es un proyecto básico de API REST construido con **Node.js**, **Express** y **MySQL**, documentado con **Swagger**. Permite realizar operaciones CRUD sobre una tabla de usuarios.

## 🚀 Tecnologías

- Node.js
- Express
- MySQL
- Postman (Pruebas)
- Swagger (Documentación)

## 📂 Estructura del proyecto

Nodejs/ ├── src/ ├── config/ # Conexión a la base de datos ├── controllers/ # Lógica de negocio ├── routes/ # Endpoints ├── swagger.js # Configuración de Swagger ├── index.js # Punto de entrada



## 📦 Instalación

1. Clona el repositorio:

git clone https://github.com/German9812/Nodejs.git
cd Nodejs


2. Instala dependencias:

npm install


3. Configura tu base de datos MySQL en config/db.js.

4. Inicia el servidor:

node index.js


📘 Documentación Swagger
Disponible en:
👉 http://localhost:3000/api-docs


🧪 Pruebas con Postman

Puedes probar todos los endpoints con Postman usando rutas locales (http://localhost:3000/api/users). Swagger también permite hacer pruebas desde el navegador.

