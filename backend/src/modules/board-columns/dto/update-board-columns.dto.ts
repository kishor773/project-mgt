import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardColumnDto } from './create-board-columns.dto';

export class UpdateBoardColumnDto extends PartialType(CreateBoardColumnDto) {}
