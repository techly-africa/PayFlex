import { Controller,Post,Body} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import  SignUpDto  from './dto/signup.dto';
import  LoginDto from './dto/login.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @ApiTags('auth')
    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

}
