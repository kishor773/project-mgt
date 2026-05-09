import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectMemberDto } from './create-project-members.dto';

export class UpdateProjectMemberDto extends PartialType(CreateProjectMemberDto) {}
