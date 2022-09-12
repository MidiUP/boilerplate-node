import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('operation')
export class OperationModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
