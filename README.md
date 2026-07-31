# Gestor de Tareas (To-Do CRUD)

Aplicación web para registrar, consultar, editar y eliminar tareas, con un dashboard sencillo para gestionarlas.

## Objetivo

Permitir al usuario crear, consultar, editar, marcar como completadas y eliminar tareas desde una interfaz web conectada a una API REST. Proyecto desarrollado como práctica de la metodología **Git Flow**.

## Tecnologías utilizadas

### Interfaz
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express
- API REST

### Almacenamiento
- En memoria (array en Node.js)

### Herramientas
- Git
- GitHub
- Git Flow
- Visual Studio Code

## Funcionalidades

- Crear tareas
- Consultar tareas
- Editar tareas
- Eliminar tareas
- Marcar tareas como completadas
- Validación de datos de entrada
- Notificaciones en la interfaz

## Estructura del proyecto

```
Yauge_Tarea3_Plll/
├── public/
│   ├── index.html
│   └── styles.css
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   └── validateTask.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── server.js
├── package.json
├── package-lock.json
└── README.md
```




Yauge Pedro
