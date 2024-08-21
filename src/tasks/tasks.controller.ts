import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FilterDto } from './dto/filter-all-task.dto';
import { FilterStatusDto } from './dto/filter-status.dto';
import { FilterPriorityDto } from './dto/filter-priority..dto';

@ApiTags('Tasks')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller({version: '1', path: 'tasks'})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Post('filter')
  filter(@Body() filterdto: FilterDto) {
    return this.tasksService.filter(filterdto);
  }

  @Post('filterStatus')
  filterS(@Body() filterStatusDto: FilterStatusDto) {
    return this.tasksService.filterStatus(filterStatusDto);
  }

  @Post('filterPriority')
  filterP(@Body() filterPriorityDto: FilterPriorityDto) {
    return this.tasksService.filterPriority(filterPriorityDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('CategoryId/:id')
  findCategAll(@Param('id') id: string) {
    return this.tasksService.findCategAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }
  
  @Patch('status/:id')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.tasksService.updateStatus(id, updateStatusDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
