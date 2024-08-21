import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";


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
  
export class CreateTaskDto {
    @ApiProperty({example: 'Go home'})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'})
    @IsNotEmpty()
    @IsString()
    description:string;

    @ApiProperty({example: 'http://localhost:4000/133db42d-b069-49d9-bc4c-34ffb89fcdda'})
    @IsNotEmpty()
    @IsString()
    photo: string;

    @ApiProperty({example: '2024-01-20T00:00:00Z'})
    @IsNotEmpty()
    @IsDateString()
    DueDate: Date;

    @ApiProperty({example: Priority.low})
    @IsEnum(Priority)
    @IsNotEmpty()
    priority: Priority;

    @ApiProperty({example: Status.progress})
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;

    @ApiProperty({example: '10828f54-0c77-4c0c-bee6-7cc8e0c47fef'})
    @IsString()
    @IsNotEmpty()
    userId: string

    @ApiProperty({example: '03cc95ce-4c26-4064-9be3-bdf0b1a62a34'})
    @IsString()
    @IsNotEmpty()
    categoryId: string
}
