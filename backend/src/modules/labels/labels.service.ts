import { Injectable } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-labels.dto';
import { UpdateLabelDto } from './dto/update-labels.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LabelsService {
  constructor(private prisma: PrismaService) {}

  create(createLabelDto: CreateLabelDto) {
    return this.prisma.labels.create({
      data: createLabelDto as any,
    });
  }

  findAll() {
    return this.prisma.labels.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.labels.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateLabelDto: UpdateLabelDto) {
    return this.prisma.labels.update({
      where: { id: BigInt(id) } as any,
      data: updateLabelDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.labels.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
