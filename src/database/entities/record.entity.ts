import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('records')
export class RecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;
}
