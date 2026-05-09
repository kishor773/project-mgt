import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeLogDto } from './create-time-logs.dto';

export class UpdateTimeLogDto extends PartialType(CreateTimeLogDto) {}
