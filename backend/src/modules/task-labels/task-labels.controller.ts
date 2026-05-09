import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskLabelsService } from './task-labels.service';
import { CreateTaskLabelDto } from './dto/create-task-labels.dto';
import { UpdateTaskLabelDto } from './dto/update-task-labels.dto';

@Controller('task-labels')
export class TaskLabelsController {
  constructor(private readonly tasklabelsService: TaskLabelsService) {}

  @Post()
  create(@Body() createTaskLabelDto: CreateTaskLabelDto) {
    return this.tasklabelsService.create(createTaskLabelDto);
  }

  @Get()
  findAll() {
    return this.tasklabelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasklabelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskLabelDto: UpdateTaskLabelDto) {
    return this.tasklabelsService.update(+id, updateTaskLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasklabelsService.remove(+id);
  }
}
