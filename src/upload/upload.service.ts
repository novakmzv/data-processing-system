import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UploadService {
  constructor(@InjectQueue('processing-queue') private queue: Queue) {}

  async handleFile(file: Express.Multer.File) {
    await this.queue.add('process-file', {
      buffer: file.buffer,
      originalname: file.originalname,
    });
    return { message: 'File accepted for processing' };
  }
}
