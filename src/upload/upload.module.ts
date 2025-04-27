import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'processing-queue' }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
