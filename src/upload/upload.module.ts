import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'processing-queue',
      redis: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT) ?? 6379,
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
