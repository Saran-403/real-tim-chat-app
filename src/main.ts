// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { CustomSocket } from './types/socket';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpServer = createServer(app.getHttpAdapter().getInstance());
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:8080',
    },
  });

  io.use((socket: CustomSocket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    socket.username = username;
    next();
  });

  io.on('connection', (socket: CustomSocket) => {
    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userID: id,
        username: (socket as CustomSocket).username,
      });
    }
    socket.emit('users', users);

    socket.broadcast.emit('user connected', {
      userID: socket.id,
      username: socket.username,
    });

    socket.on('private message', ({ content, to }) => {
      socket.to(to).emit('private message', {
        content,
        from: socket.id,
      });
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('user disconnected', {
        userID: socket.id,
        username: socket.username,
      });
    });
  });

  await app.listen(3000);
  httpServer.listen(3001);
}
bootstrap();
