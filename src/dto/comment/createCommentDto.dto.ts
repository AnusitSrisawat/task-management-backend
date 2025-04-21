

import { IsString, IsNotEmpty, ValidateNested, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Task } from 'src/entity/task.entity';
import { User } from 'src/entity/user.entity';

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @ValidateNested()
    @Type(() => Task)
    task: Task;

    @ValidateNested()
    @Type(() => User)
    user: User;

    // @IsDate()
    // createdAt: Date;
}
