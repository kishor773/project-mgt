import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organizations.dto';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
