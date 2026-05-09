import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityLogDto } from './create-activity-logs.dto';

export class UpdateActivityLogDto extends PartialType(CreateActivityLogDto) {}
