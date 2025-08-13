## Nota sobre despliegue en Vercel y WebSockets

Esta aplicación requiere WebSockets (Socket.io) para el contador global en tiempo real. Sin embargo, **Vercel no soporta WebSockets en su plataforma serverless**, por lo que el contador en tiempo real no funcionará si se despliega allí. Por esta razón, el despliegue funcional debe realizarse en plataformas como Railway, Render, Fly.io o Heroku, que sí permiten procesos persistentes y WebSockets.

Esta limitación es la razón por la que la funcionalidad en tiempo real no está disponible en la versión desplegada en Vercel.
# Contador Global de Clics

Este proyecto es una aplicación Node.js + Express + Socket.io que permite a cualquier usuario autenticado con Google incrementar un contador global en tiempo real.

## Funcionamiento (modo local)

### 1. Pantalla de inicio
Al abrir la app, se muestra un modal elegante solicitando iniciar sesión con Google antes de poder interactuar con el contador.

![Pantalla de inicio](https://i.imgur.com/S7SK6jQ.png)

### 2. Selección de cuenta Google
Al hacer clic en "Iniciar sesión con Google", se abre la pantalla de selección de cuenta.

![Selección de cuenta](https://i.imgur.com/OW1iZ2R.png)

### 3. Consentimiento de Google
Google muestra la pantalla de consentimiento para autorizar el acceso a tu perfil y correo.

![Consentimiento Google](https://i.imgur.com/DUdmSPb.png)

### 4. Contador global en tiempo real
Una vez autenticado, puedes ver tu nombre, cerrar sesión y presionar el botón para incrementar el contador global. El valor se actualiza en tiempo real para todos los usuarios conectados.

![Contador global](https://i.imgur.com/V6qVVOY.png)

## Instalación y uso local

1. Clona el repositorio y entra a la carpeta del proyecto.
2. Crea un archivo `.env` con tus credenciales de Google y JWT.
3. Instala las dependencias:
   ```sh
   npm install
   ```
4. Inicia el servidor:
   ```sh
   npm start
   ```
5. Abre [http://localhost:3001](http://localhost:3001) en tu navegador.

## Variables de entorno requeridas

```
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=24h
CLIENT_URL=http://localhost:3001
```

## Características
- Autenticación OAuth 2.0 con Google
- Gestión de sesión con JWT
- Contador global en tiempo real con Socket.io
- Interfaz moderna y modal de login
- Botón para cerrar sesión

---

