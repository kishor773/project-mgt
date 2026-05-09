import { Module } from '@nestjs/common';
import { TaskLabelsController } from './task-labels.controller';
import { TaskLabelsService } from './task-labels.service';

@Module({
  controllers: [TaskLabelsController],
  providers: [TaskLabelsService]
})
export class TaskLabelsModule {}
