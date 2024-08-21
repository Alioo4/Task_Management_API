import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString, Max } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Bahodir Jalolov'})
    fullname: string;

    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    @ApiProperty({example: '998900000000'})
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '99999'})
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'http://localhost:4000/1221wqdssdas.jpg'})
    photo: string;
} 
