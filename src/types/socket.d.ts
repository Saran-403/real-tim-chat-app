// src/types/socket.d.ts
import { Socket as DefaultSocket } from 'socket.io';

interface CustomSocket extends DefaultSocket {
  username?: string;
}

export { CustomSocket };
