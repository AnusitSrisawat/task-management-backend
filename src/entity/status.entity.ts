import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany
} from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.status)
  tasks: Task[];
}
