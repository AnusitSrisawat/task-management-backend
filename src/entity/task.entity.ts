import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  OneToMany, CreateDateColumn, UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Comment } from './comment.entity';
import { Status } from './status.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'medium' })
  priority: 'low' | 'medium' | 'high';

  @Column({ nullable: true, type: 'float' })
  estimatedTime: number; // for ML prediction

  @Column({ nullable: true, type: 'timestamp' })
  dueDate: Date;

  @ManyToOne(() => Status, status => status.tasks, { nullable: false, onDelete: 'CASCADE' })
  status: Status;

  @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE' })
  project: Project;

  @ManyToMany(() => User, user => user.tasks, { nullable: true })
  @JoinTable()
  users: User[];

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
