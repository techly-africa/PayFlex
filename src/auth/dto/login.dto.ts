import { IsString, IsEmail, IsNotEmpty, MinLength,Validate, ValidationArguments, ValidatorConstraintInterface} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumberReg } from 'src/utils/regex';


export class IsEmailOrPhoneNumberConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      if (IsPhoneNumberReg(value) ) {
        return true;
      }
      return false;
    }
    defaultMessage(args: ValidationArguments) {
      return 'Invalid email or phone number format';
    }
  }

export default class LoginDto {
    @ApiProperty({ description: 'The email or phone of the client', type: String })
    @IsNotEmpty()
    @Validate(IsEmailOrPhoneNumberConstraint, {
      message: 'Invalid email or phone number format',
    })
    emailOrPhone: string;
  @ApiProperty({ description: 'The password of the client', type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}