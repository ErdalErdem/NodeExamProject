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
app.use(express.urlencoded({ extended: true }));


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

// Existing middleware and routes setup...

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('skip', () => {
    // Logic to handle skip
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
