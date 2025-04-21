

import { IsEmail, IsUUID, IsString, IsNotEmpty, IsIn, IsArray, ValidateNested, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Project } from 'src/entity/project.entity';
import { Task } from 'src/entity/task.entity';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsIn(['user', 'admin'])
    role: 'user' | 'admin';

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Task)
    tasks: Task[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Project)
    projects: Project[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Comment)
    comments: Comment[];

    // @IsDate()
    // createdAt: Date;

    // @IsDate()
    // updatedAt: Date;
}
