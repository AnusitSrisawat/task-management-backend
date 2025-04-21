

import { IsEmail, IsUUID, IsString, IsNotEmpty, IsIn, IsArray, ValidateNested, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Project } from 'src/entity/project.entity';
import { Status } from 'src/entity/status.entity';

export class UpdateTaskDto {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @ValidateNested()
    @Type(() => Status)
    status: Status;

    @IsIn(['low', 'medium', 'high'])
    priority: 'low' | 'medium' | 'high';

    @Type(() => Number)
    estimatedTime: number;

    @IsDate()
    @Type(() => Date)
    dueDate: Date;

    @ValidateNested()
    @Type(() => Project)
    project: Project;

    @IsUUID()
    @IsArray()
    assigneeIds: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Comment)
    comments: Comment[];

    // @IsDate()
    // @Type(() => Date)
    // createdAt: Date;

    // @IsDate()
    // @Type(() => Date)
    // updatedAt: Date;
}
