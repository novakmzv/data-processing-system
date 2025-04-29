import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
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

    let records: Record<string, string>[] = [];

    if (originalname.endsWith('.csv')) {
      const content = buffer.toString('utf-8');
      const parsed = Papa.parse(content, { header: true });
      records = parsed.data as Record<string, string>[];
    } else if (originalname.endsWith('.xlsx')) {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      records = XLSX.utils.sheet_to_json(worksheet);
    } else {
      throw new Error('Unsupported file format');
    }

    for (const record of records) {
      const newRecord = this.dataSource.manager.create(RecordEntity, { data: JSON.stringify(record) });
      await this.dataSource.manager.save(newRecord);
    }

    this.websocketGateway.notifyProcessingCompleted(originalname, records.length);
  }
}
