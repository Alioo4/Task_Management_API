import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    @ApiProperty({example: '998900000000'})
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '99999'})
    password: string;
}
