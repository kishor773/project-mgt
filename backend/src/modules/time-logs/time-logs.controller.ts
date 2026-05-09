import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeLogsService } from './time-logs.service';
import { CreateTimeLogDto } from './dto/create-time-logs.dto';
import { UpdateTimeLogDto } from './dto/update-time-logs.dto';

@Controller('time-logs')
export class TimeLogsController {
  constructor(private readonly timelogsService: TimeLogsService) {}

  @Post()
  create(@Body() createTimeLogDto: CreateTimeLogDto) {
    return this.timelogsService.create(createTimeLogDto);
  }

  @Get()
  findAll() {
    return this.timelogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeLogDto: UpdateTimeLogDto) {
    return this.timelogsService.update(+id, updateTimeLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timelogsService.remove(+id);
  }
}
