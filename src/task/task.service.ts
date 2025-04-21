import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from } from "rxjs";
import { CreateTaskDto } from "src/dto/task/createTaskDto.dto";
import { UpdateTaskDto } from "src/dto/task/updateTaskDto.dto";
import { Project } from "src/entity/project.entity";
import { Status } from "src/entity/status.entity";
import { Task } from "src/entity/task.entity";
import { User } from "src/entity/user.entity";
import { Repository, DeepPartial, In } from "typeorm";
// import { Transactional } from "typeorm-transactional";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepo: Repository<Task>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Status)
        private statusRepo: Repository<Status>,
        @InjectRepository(Project)
        private projectRepo: Repository<Project>,
    ) { }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepo.create(createTaskDto as DeepPartial<Task>);
        return this.taskRepo.save(task);
    }

    async findAll(): Promise<Task[]> {
        return this.taskRepo.find({
            relations: ['comments', 'users', 'project', 'status'],
        });
    }

    async findOne(id: string): Promise<Task> {
        return this.taskRepo.findOne({
            where: { id },
            relations: ['comments', 'users', 'project', 'status'],
        });
    }

    // @Transactional()
    async update(updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskRepo.findOne({
            where: { id: updateTaskDto.id },
            relations: ['comments', 'users', 'project', 'status'],
        });
        if (!task) {
            throw new Error('Task not found');
        }
        task.title = updateTaskDto.title;
        task.description = updateTaskDto.description;
        task.priority = updateTaskDto.priority;
        task.estimatedTime = updateTaskDto.estimatedTime;
        task.dueDate = updateTaskDto.dueDate;

        if (updateTaskDto.status) {
            const status = await this.statusRepo.findOne({ where: { id: updateTaskDto.status.id } });
            if (!status) {
                throw new Error('Status not found');
            }
            task.status = status;
        }

        if (updateTaskDto.project) {
            const project = await this.projectRepo.findOne({ where: { id: updateTaskDto.project.id } });
            if (!project) {
                throw new Error('Project not found');
            }
            task.project = project;
        }

        const users = await this.userRepo.findByIds(updateTaskDto.assigneeIds);
        if (!users) {
            throw new Error('Users not found');
        }
        task.users = users;

        return this.taskRepo.save(task);
    }

    async remove(id: string): Promise<void> {
        const task = await this.taskRepo.findOne({ where: { id } });
        if (!task) {
            throw new Error('Task not found');
        }
        await this.taskRepo.delete(id);
    }

    async assignTaskToUser(taskId: string, userIds: string[]): Promise<Task> {
        const task = await this.taskRepo.findOne({
            where: { id: taskId },
            relations: ['users', 'project', 'status', 'comments'],
        });
        if (!task) {
            throw new Error('Task not found');
        }
        const users = await this.userRepo.findBy({
            id: In(userIds),
        });
        if (!users || users.length === 0) {
            throw new Error('Users not found');
        }
        task.users = users;
        return this.taskRepo.save(task);
    }

    async updateStatus(id: string, statusId: string): Promise<Task> {
        const task = await this.taskRepo.findOne({ where: { id } });
        if (!task) {
            throw new Error('Task not found');
        }
        const status = await this.statusRepo.findOne({ where: { id: statusId } });
        if (!status) {
            throw new Error('status not found');
        }
        task.status = status;
        return this.taskRepo.save(task);
    }

    async findByProject(projectId: string): Promise<Task[]> {
        return this.taskRepo.find({ where: { project: { id: projectId } } });
    }
}
