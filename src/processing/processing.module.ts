import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ProcessingProcessor } from './processing.processor';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'processing-queue',
    }),
    WebsocketModule,
    DatabaseModule,
  ],
  providers: [ProcessingProcessor],
})
export class ProcessingModule {}
