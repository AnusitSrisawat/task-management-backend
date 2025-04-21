import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user/createUserDto.dto';
import { UpdateUserDto } from 'src/dto/user/updateUserDto.dto';
import { User } from 'src/entity/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepo.create(createUserDto as DeepPartial<User>);
        return this.userRepo.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepo.find({
            relations: ['tasks', 'comments'],
            order: { createdAt: 'ASC' }
        });
    }

    async findOne(id: string): Promise<User> {
        return this.userRepo.findOne({
            where: { id },
            relations: ['tasks', 'comments']
        });
    }

    async update(updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id: updateUserDto.id } });
        if (!user) {
            throw new Error('User not found');
        }
        user.name = updateUserDto.name;
        user.email = updateUserDto.email;
        return this.userRepo.save(user);
    }

    async remove(id: string): Promise<void> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        await this.userRepo.delete(id);
    }
}

// GET	/users/me	ข้อมูลโปรไฟล์ตัวเอง ??
// PATCH	/users/me	แก้ไขโปรไฟล์ ??