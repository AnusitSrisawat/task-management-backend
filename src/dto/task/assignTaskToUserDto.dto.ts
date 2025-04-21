import { IsUUID, IsArray } from "class-validator";

export class AssignTaskToUserDto {
    @IsUUID()
    taskId: string;

    @IsUUID()
    @IsArray()
    assigneeIds: string[];

}
