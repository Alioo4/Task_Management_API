import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

enum Status{
    todo = 'todo',
    progress = 'progress',
    completed = 'completed'
}

export class FilterStatusDto {
    @ApiProperty({example: Status.progress})
    @IsEnum(Status)
    status: Status;
}