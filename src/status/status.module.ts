import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from 'src/entity/status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status, Task])],
  providers: [StatusService],
  controllers: [StatusController]
})
export class StatusModule {}
