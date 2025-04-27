import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  notifyProcessingCompleted(fileName: string, recordsProcessed: number) {
    this.server.emit('processingCompleted', {
      fileName,
      recordsProcessed,
    });
  }
}
