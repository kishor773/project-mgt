import { Injectable } from '@nestjs/common';
import { CreateMilestoneDto } from './dto/create-milestones.dto';
import { UpdateMilestoneDto } from './dto/update-milestones.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MilestonesService {
  constructor(private prisma: PrismaService) {}

  create(createMilestoneDto: CreateMilestoneDto) {
    return this.prisma.milestones.create({
      data: createMilestoneDto as any,
    });
  }

  findAll() {
    return this.prisma.milestones.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.milestones.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateMilestoneDto: UpdateMilestoneDto) {
    return this.prisma.milestones.update({
      where: { id: BigInt(id) } as any,
      data: updateMilestoneDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.milestones.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
