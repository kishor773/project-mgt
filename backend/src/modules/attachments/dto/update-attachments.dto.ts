import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachmentDto } from './create-attachments.dto';

export class UpdateAttachmentDto extends PartialType(CreateAttachmentDto) {}
