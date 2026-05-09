import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskLabelDto } from './create-task-labels.dto';

export class UpdateTaskLabelDto extends PartialType(CreateTaskLabelDto) {}
