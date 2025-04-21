import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from 'src/dto/project/createProjectDto.dto';
import { UpdateProjectDto } from 'src/dto/project/updateProjectDto.dto';
import { Project } from 'src/entity/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepo: Repository<Project>,
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const project = this.projectRepo.create(createProjectDto);
        return this.projectRepo.save(project);
    }

    async findAll(): Promise<Project[]> {
        return this.projectRepo.find({
            relations: ['tasks', 'users'],
            order: { createdAt: 'ASC' }
        });
    }

    async findOne(id: string): Promise<Project> {
        return this.projectRepo.findOne({
            where: { id },
            relations: ['tasks', 'users']
        });
    }

    async update(updateProjectDto: UpdateProjectDto): Promise<Project> {
        const project = await this.projectRepo.findOne({ where: { id: updateProjectDto.id } });
        if (!project) {
            throw new Error('project not found');
        }
        project.name = updateProjectDto.name;
        project.description = updateProjectDto.description;
        return this.projectRepo.save(project);
    }

    async remove(id: string): Promise<void> {
        const project = await this.projectRepo.findOne({ where: { id } });
        if (!project) {
            throw new Error('project not found');
        }
        await this.projectRepo.delete(id);
    }
}
