import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/entity/status.entity';
import { Task } from 'src/entity/task.entity';
import { User } from 'src/entity/user.entity';
import { Project } from 'src/entity/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task, Status, Project])],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
