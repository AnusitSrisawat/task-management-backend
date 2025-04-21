import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from 'src/entity/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Project, Task])],
    providers: [ProjectService],
    controllers: [ProjectController]
})
export class ProjectModule { }
