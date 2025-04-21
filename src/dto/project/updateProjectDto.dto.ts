

import { IsEmail, IsUUID, IsString, IsNotEmpty, IsIn, IsArray, ValidateNested, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Project } from 'src/entity/project.entity';
import { Task } from 'src/entity/task.entity';
import { User } from 'src/entity/user.entity';

export class UpdateProjectDto {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => User)
    // users: User[];

    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => Task)
    // tasks: Task[];

    // @IsDate()
    // createdAt: Date;

    // @IsDate()
    // updatedAt: Date;
}
