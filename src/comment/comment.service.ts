import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dto/comment/createCommentDto.dto';
import { UpdateCommentDto } from 'src/dto/comment/updateCommentDto.dto';
import { DeepPartial, Repository } from 'typeorm';
import { Comment } from "src/entity/comment.entity";
import { Task } from 'src/entity/task.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,
        @InjectRepository(Task)
        private taskRepo: Repository<Task>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = this.commentRepo.create(createCommentDto as DeepPartial<Comment>);
        return this.commentRepo.save(comment);
    }

    async findAll(): Promise<Comment[]> {
        return this.commentRepo.find({
            relations: ['task', 'user'],
            order: { createdAt: 'ASC' }
        });
    }

    async findOne(id: string): Promise<Comment> {
        return this.commentRepo.findOne({
            where: { id },
            relations: ['task', 'user']
        });
    }

    async update(updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentRepo.findOne({ where: { id: updateCommentDto.id } });
        if (!comment) {
            throw new Error('comment not found');
        }
        comment.content = updateCommentDto.content;
        // comment.createdAt = updateCommentDto.createdAt;

        if (updateCommentDto.task) {
            const task = await this.taskRepo.findOne({ where: { id: updateCommentDto.task.id } });
            if (!task) {
                throw new Error('Task not found');
            }
            comment.task = task;
        }

        if (updateCommentDto.user) {
            const user = await this.userRepo.findOne({ where: { id: updateCommentDto.user.id } });
            if (!user) {
                throw new Error('User not found');
            }
            comment.user = user;
        }

        // comment.task = updateCommentDto.task;
        // comment.user = updateCommentDto.user;
        return this.commentRepo.save(comment);
    }

    async remove(id: string): Promise<void> {
        const comment = await this.commentRepo.findOne({ where: { id } });
        if (!comment) {
            throw new Error('comment not found');
        }
        await this.commentRepo.delete(id);
    }

    async findAllByTask(taskId: string): Promise<Comment[]> {
        return this.commentRepo.find({
            where: { task: { id: taskId } },
            order: { createdAt: 'ASC' },
        });
    }
}
