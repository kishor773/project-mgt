import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comments.dto';
import { UpdateCommentDto } from './dto/update-comments.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    return this.prisma.comments.create({
      data: createCommentDto as any,
    });
  }

  findAll() {
    return this.prisma.comments.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.comments.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comments.update({
      where: { id: BigInt(id) } as any,
      data: updateCommentDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.comments.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
