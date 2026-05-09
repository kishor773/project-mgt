import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardColumnsService } from './board-columns.service';
import { CreateBoardColumnDto } from './dto/create-board-columns.dto';
import { UpdateBoardColumnDto } from './dto/update-board-columns.dto';

@Controller('board-columns')
export class BoardColumnsController {
  constructor(private readonly boardcolumnsService: BoardColumnsService) {}

  @Post()
  create(@Body() createBoardColumnDto: CreateBoardColumnDto) {
    return this.boardcolumnsService.create(createBoardColumnDto);
  }

  @Get()
  findAll() {
    return this.boardcolumnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardcolumnsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardColumnDto: UpdateBoardColumnDto) {
    return this.boardcolumnsService.update(+id, updateBoardColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardcolumnsService.remove(+id);
  }
}
