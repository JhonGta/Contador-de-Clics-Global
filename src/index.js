import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import './passport.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' }
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'sessionsecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());

app.use(passport.session());

let contador = 0;

// OAuth routes (Google)
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Emitir JWT
  const user = req.user;
  const token = jwt.sign(
    { id: user.id, username: user.displayName, email: user.emails?.[0]?.value },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/'); // Redirige al frontend
});

// Middleware para proteger rutas
function authenticateJWT(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  if (err) return res.status(403).json({ error: 'Token inválido' });
  req.user = user;
  next();
  });
}

// Ruta protegida
app.get('/api/profile', authenticateJWT, (req, res) => {
  res.json({ user: req.user });
});

// Servir frontend simple
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/src/index.html');
});

// Socket.io para contador global
io.on('connection', (socket) => {
  socket.emit('contador:actualizado', contador);
  socket.on('contador:clic', () => {
    contador++;
    io.emit('contador:actualizado', contador);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Servidor escuchando en puerto', PORT);
});
