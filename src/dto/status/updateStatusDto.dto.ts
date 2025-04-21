import { IsUUID, IsNotEmpty, IsString } from "class-validator";

export class UpdateStatusDto {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
