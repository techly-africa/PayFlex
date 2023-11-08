import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    Validate
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { IsPhoneNumberReg } from 'src/utils/regex';
  // VALIDATION FOR SIGNUP
  export default class SignUpDto {
    @ApiProperty({ description: 'The name of the client', type: String })
    @IsNotEmpty()
    name: string;
    @ApiProperty({ description: 'The email of the client', type: String })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({ description: 'The password of the client', type: String })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    @ApiProperty({ description: 'The phone of the client', type: String })
    @IsNotEmpty()
    @Validate(IsPhoneNumberReg, {
      message: 'Phone number must be a valid phone number',
    })

    phone: string;
  }