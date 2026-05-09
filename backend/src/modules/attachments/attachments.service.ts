import { Injectable } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachments.dto';
import { UpdateAttachmentDto } from './dto/update-attachments.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  create(createAttachmentDto: CreateAttachmentDto) {
    return this.prisma.attachments.create({
      data: createAttachmentDto as any,
    });
  }

  findAll() {
    return this.prisma.attachments.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.attachments.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
    return this.prisma.attachments.update({
      where: { id: BigInt(id) } as any,
      data: updateAttachmentDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.attachments.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
