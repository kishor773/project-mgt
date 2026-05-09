import { PartialType } from '@nestjs/mapped-types';
import { CreateLabelDto } from './create-labels.dto';

export class UpdateLabelDto extends PartialType(CreateLabelDto) {}
