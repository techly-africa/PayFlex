import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  User  from 'src/schemas/user.entity';
import SignUpDto  from './dto/signup.dto';
import  LoginDto  from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userModel: Repository<User>,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<User> {
        const { email, phone,password } = signUpDto;
        const user = await this.userModel
        .createQueryBuilder('user')
        .where('user.email = :email OR user.phone = :phone', { email, phone })
        .getOne();
  
        if (user) {
          throw new BadRequestException('Email or phone already exists');
        }
        signUpDto.password = await bcrypt.hash(password, 10);
        const newUser = this.userModel.create(signUpDto);
        return await this.userModel.save(newUser);
    }
    async login(loginDto: LoginDto): Promise<User> {
        const { emailOrPhone, password } = loginDto;
        const user = await this.userModel
        .createQueryBuilder('user')
        .where('user.email = :emailOrPhone OR user.phone = :emailOrPhone', {
          emailOrPhone,
        })
        .getOne();
        if (!user) {
          throw new BadRequestException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new BadRequestException('Invalid credentials');
        }
        return user;
    }
}

