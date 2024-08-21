import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FilterDto } from './dto/filter-all-task.dto';
import { FilterStatusDto } from './dto/filter-status.dto';
import { FilterPriorityDto } from './dto/filter-priority..dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService){}
  async create(payload: CreateTaskDto) {
    const {title, description, DueDate, categoryId, photo, priority, status, userId} = payload 

    await this.prisma.tasks.create({data: {title, description, photo, DueDate, priority, status, categoryId, userId }})
    return {message: 'Successfully create'};
  }

  async filter(payload: FilterDto) {
    const {status, priority, DueDateGte, DueDateLte} = payload 

    const where: any = {};

  if (status) {
    where.status = status;
  }

  if (priority) {
    where.priority = priority;
  }

  if (DueDateGte || DueDateLte) {
    where.DueDate = {};
    if (DueDateGte) {
      where.DueDate.gte = new Date(DueDateGte);
    }
    if (DueDateLte) {
      where.DueDate.lte = new Date(DueDateLte);
    }
  }

  const data = await this.prisma.tasks.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      photo: true,
      DueDate: true,
      priority: true,
      status: true,
      categoryId: true,
      userId: true
    }
  });

  return { message: 'Successfully filtered', data };
}

  async filterStatus(payload: FilterStatusDto) {
    const {status} = payload 

    const where: any = {};

  if (status) {
    where.status = status;
  }

  const data = await this.prisma.tasks.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      photo: true,
      DueDate: true,
      priority: true,
      status: true,
      categoryId: true,
      userId: true
    }
  });

  return { message: 'Successfully filtered', data };
}

  async filterPriority(payload: FilterPriorityDto) {
    const {priority} = payload 

    const where: any = {};

  if (priority) {
    where.priority = priority;
  }

  const data = await this.prisma.tasks.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      photo: true,
      DueDate: true,
      priority: true,
      status: true,
      categoryId: true,
      userId: true
    }
  });

  return { message: 'Successfully filtered', data };
}

  async findAll() {
    const data = await this.prisma.tasks.findMany()
    return data;
  }

  async findCategAll(id: string) {
    const data = await this.prisma.tasks.findMany({where: {categoryId: id}})
    return data;
  }

  async findOne(id: string) {
    const data = await this.prisma.tasks.findUnique({where: {id}})
    return {data: data};
  }

  async update(id: string, payload: UpdateTaskDto) {
    const {DueDate, title, description, photo, priority, status, categoryId, userId} = payload
    await this.prisma.tasks.update({where: {id}, data: {title, description, photo, DueDate, priority, status, categoryId, userId}})

    return {message: 'Success!!!'};
  }

  async updateStatus(id: string, payload: UpdateStatusDto) {
    const {status} = payload
    await this.prisma.tasks.update({where: {id}, data: { status}})

    return {message: 'Success!!!'};
  }

  async remove(id: string) {
    await this.prisma.tasks.delete({where: {id}})
    return {message: 'Success!!!'};
  }
}
