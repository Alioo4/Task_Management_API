import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";

enum Status{
    todo = 'todo',
    progress = 'progress',
    completed = 'completed'
}

export class UpdateStatusDto {
    @ApiProperty({example: Status.progress})
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;
}