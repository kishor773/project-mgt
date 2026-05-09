import { PartialType } from '@nestjs/mapped-types';
import { CreateMilestoneDto } from './create-milestones.dto';

export class UpdateMilestoneDto extends PartialType(CreateMilestoneDto) {}
