import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: 'Tasks'})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({example: 'http://localhost:4000/133db42d-b069-49d9-bc4c-34ffb89fcdda'})
    @IsNotEmpty()
    @IsString()
    photo: string;
}
