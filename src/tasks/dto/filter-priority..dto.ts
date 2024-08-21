import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

enum Priority{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class FilterPriorityDto {
    @ApiProperty({example: Priority.low})
    @IsEnum(Priority)
    priority: Priority;
}