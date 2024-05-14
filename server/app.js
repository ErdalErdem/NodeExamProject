import express from 'express';
import session from 'express-session';
import 'dotenv/config';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { sequelize, User } from './database/db.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
    credentials: true,
    origin: true
}));

app.use(express.static('public'));
app.use(helmet());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

const authRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    limit: 10,
    message: "Too many attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/auth", authRateLimiter); 

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    limit: 30, 
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

import userRouter from './routers/userRouter.js';
app.use(userRouter);

import xssRouter from './routers/xssRouter.js';
app.use(xssRouter);

import sessionRouter from './routers/sessionRouter.js';
app.use(sessionRouter);

import authRouter from './routers/authRouter.js';
app.use(authRouter);

// Store active users
let activeUsers = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('register user', async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        activeUsers[socket.id] = user.username;
        io.emit('active users', Object.values(activeUsers));
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    delete activeUsers[socket.id];
    io.emit('active users', Object.values(activeUsers));
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
