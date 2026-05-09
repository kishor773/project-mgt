import { Injectable } from '@nestjs/common';
import { CreateBoardColumnDto } from './dto/create-board-columns.dto';
import { UpdateBoardColumnDto } from './dto/update-board-columns.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BoardColumnsService {
  constructor(private prisma: PrismaService) {}

  create(createBoardColumnDto: CreateBoardColumnDto) {
    return this.prisma.board_columns.create({
      data: createBoardColumnDto as any,
    });
  }

  findAll() {
    return this.prisma.board_columns.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.board_columns.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateBoardColumnDto: UpdateBoardColumnDto) {
    return this.prisma.board_columns.update({
      where: { id: BigInt(id) } as any,
      data: updateBoardColumnDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.board_columns.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
