import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import Papa from 'papaparse';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { RecordEntity } from '../database/entities/record.entity';
import { DataSource } from 'typeorm';

@Processor('processing-queue')
export class ProcessingProcessor {
  constructor(
    private websocketGateway: WebsocketGateway,
    private dataSource: DataSource,
  ) {}

  @Process('process-file')
  async handleProcessFile(job: Job) {
    const { buffer, originalname } = job.data;
    const content = buffer.toString('utf-8');

    const parsed = Papa.parse(content, { header: true });

    const records = parsed.data as Record<string, string>[];

    for (const record of records) {
      const newRecord = this.dataSource.manager.create(RecordEntity, record);
      await this.dataSource.manager.save(newRecord);
    }

    this.websocketGateway.notifyProcessingCompleted(originalname, records.length);
  }
}
