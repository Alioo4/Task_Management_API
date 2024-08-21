import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt'
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService,
  ){}
  async register(payload: RegisterAuthDto) {
    const newUser = await this.users.create(payload)
    const token = await this.jwt.sign({id: newUser.id});
    return {data: token};
  }

  async login(payload: LoginAuthDto) {
    const user = await this.users.findByPhone(payload.phone);
    
    if(!user)
      throw new UnauthorizedException();

    const check = await compare(payload.password, user.password);

    if(!check)
      throw new UnauthorizedException()
    
    const token = await this.jwt.sign({id: user.id});
    return {data: token};
  }
}

