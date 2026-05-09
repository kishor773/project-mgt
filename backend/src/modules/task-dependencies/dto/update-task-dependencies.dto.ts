import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDependencyDto } from './create-task-dependencies.dto';

export class UpdateTaskDependencyDto extends PartialType(CreateTaskDependencyDto) {}
