import { PartialType } from '@nestjs/mapped-types';
import { CreateSprintDto } from './create-sprints.dto';

export class UpdateSprintDto extends PartialType(CreateSprintDto) {}
