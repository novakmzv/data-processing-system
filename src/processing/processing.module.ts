import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ProcessingProcessor } from './processing.processor';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'processing-queue',
      redis: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT) ?? 6379,
      },
    }),
    WebsocketModule,
    DatabaseModule,
  ],
  providers: [ProcessingProcessor],
})
export class ProcessingModule {}
