import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum } from "class-validator";

enum Priority{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

enum Status{
    todo = 'todo',
    progress = 'progress',
    completed = 'completed'
}

export class FilterDto {
    @ApiProperty({example: '2024-01-20T00:00:00Z'})
    @IsDateString()
    DueDateGte?: string;
  
    @ApiProperty({example: '2024-09-20T00:00:00Z'})
    @IsDateString()
    DueDateLte?: string;

    @ApiProperty({example: Priority.low})
    @IsEnum(Priority)
    priority?: Priority;

    @ApiProperty({example: Status.progress})
    @IsEnum(Status)
    status?: Status;
}