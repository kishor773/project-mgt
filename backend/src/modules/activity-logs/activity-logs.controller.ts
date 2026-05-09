import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './dto/create-activity-logs.dto';
import { UpdateActivityLogDto } from './dto/update-activity-logs.dto';

@Controller('activity-logs')
export class ActivityLogsController {
  constructor(private readonly activitylogsService: ActivityLogsService) {}

  @Post()
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activitylogsService.create(createActivityLogDto);
  }

  @Get()
  findAll() {
    return this.activitylogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitylogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityLogDto: UpdateActivityLogDto) {
    return this.activitylogsService.update(+id, updateActivityLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitylogsService.remove(+id);
  }
}
