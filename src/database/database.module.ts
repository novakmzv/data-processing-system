import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from './entities/record.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: '',
      password: '',
      database: '',
      entities: [RecordEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([RecordEntity]),
  ],
})
export class DatabaseModule {}
