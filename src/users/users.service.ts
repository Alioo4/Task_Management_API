import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){}
  async create(payload: CreateUserDto) {
    const { fullname, password, phone, photo } = payload;

    const hashPas = await hash(password, 12)

    const newUser = await this.prisma.users.create({data: {fullname, password: hashPas , phone, photo}});

    return newUser;
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(id: string) {
    const findUser = await this.prisma.users.findUnique({where: {id}})

    if(!findUser)
      throw new BadRequestException('User not found!!!')

    return findUser;
  }

  async findByPhone(phone: string) {
    const findUser = await this.prisma.users.findFirst({where: {phone}})

    if(!findUser)
      throw new BadRequestException('User not found!!!')

    return findUser;
  }

  async update(id: string, payload: UpdateUserDto) {
    await this.findOne(id)
    const { fullname, password, phone, photo} = payload
    const hashPas = await hash(password, 12)
    const chanded = await this.prisma.users.update({where: {id}, data: { fullname, password: hashPas, phone, photo }})
    return chanded;
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.prisma.users.delete({where: {id}})
    return {message: 'Success'};
  }
}
