import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateStatusDto } from "src/dto/status/createStatusDto.dto";
import { UpdateStatusDto } from "src/dto/status/updateStatusDto.dto";
import { Status } from "src/entity/status.entity";
import { Repository, DeepPartial } from "typeorm";

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private statusRepo: Repository<Status>,
    ) { }

    async create(createStatusDto: CreateStatusDto): Promise<Status> {
        const status = this.statusRepo.create(createStatusDto as DeepPartial<Status>);
        return this.statusRepo.save(status);
    }

    async findAll(): Promise<Status[]> {
        return this.statusRepo.find();
    }

    async findOne(id: string): Promise<Status> {
        return this.statusRepo.findOne({
            where: { id },
            relations: ['tasks']
        });
    }

    async update(updateStatusDto: UpdateStatusDto): Promise<Status> {
        const status = await this.statusRepo.findOne({ where: { id: updateStatusDto.id } });
        if (!status) {
            throw new Error('Status not found');
        }
        status.name = updateStatusDto.name;
        return this.statusRepo.save(status);
    }

    async remove(id: string): Promise<void> {
        const status = await this.statusRepo.findOne({ where: { id } });
        if (!status) {
            throw new Error('Status not found');
        }
        await this.statusRepo.delete(id);
    }
}
