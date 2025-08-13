# Contador Global de Clics

Este proyecto implementa:
- Autenticación OAuth 2.0 con GitHub
- Gestión de sesión con JWT
- Contador global de clics en tiempo real con Socket.io
- Preparado para despliegue en Vercel

## Configuración

1. Renombra `.env` y coloca tus credenciales:
   - GITHUB_CLIENT_ID
   - GITHUB_CLIENT_SECRET
   - JWT_SECRET
   - CALLBACK_URL

2. Instala dependencias:
   npm install

3. Ejecuta localmente:
   npm start

4. Accede a `http://localhost:3000` y prueba el flujo.

## Despliegue en Vercel

- Sube el código a tu repositorio de GitHub.
- Importa el repo en Vercel y configura las variables de entorno.
- Vercel detecta automáticamente el script de inicio.

## Estructura
- `src/index.js`: Servidor Express + Socket.io
- `src/passport.js`: Configuración de OAuth
- `src/index.html`: Frontend simple

## Entrega
- Realiza commit con mensaje: "Entrega final del examen"
- Sube a GitHub y despliega en Vercel
