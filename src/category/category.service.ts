import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService){}
  async create(payload: CreateCategoryDto) {
    const { title, photo } = payload

    const data = await this.prisma.category.create({data: {title, photo}})

    return {message: 'Success', data: data};
  }

  async findAll() {
    const data = await this.prisma.category.findMany()    
    return  data;
  }

  async findOne(id: string) {
    const data = await this.prisma.category.findUnique({where: {id}}) 
    return data;
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const { photo, title } = payload

    await this.prisma.category.update({where: {id}, data: {title, photo}})
    return {message: 'Success'};
  }

  async remove(id: string) {
    await this.prisma.category.delete({where: {id}}) 
    return {message: 'Success'};
  }
}
