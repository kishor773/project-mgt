import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskDependenciesService } from './task-dependencies.service';
import { CreateTaskDependencyDto } from './dto/create-task-dependencies.dto';
import { UpdateTaskDependencyDto } from './dto/update-task-dependencies.dto';

@Controller('task-dependencies')
export class TaskDependenciesController {
  constructor(private readonly taskdependenciesService: TaskDependenciesService) {}

  @Post()
  create(@Body() createTaskDependencyDto: CreateTaskDependencyDto) {
    return this.taskdependenciesService.create(createTaskDependencyDto);
  }

  @Get()
  findAll() {
    return this.taskdependenciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskdependenciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDependencyDto: UpdateTaskDependencyDto) {
    return this.taskdependenciesService.update(+id, updateTaskDependencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskdependenciesService.remove(+id);
  }
}
