import { Injectable } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprints.dto';
import { UpdateSprintDto } from './dto/update-sprints.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SprintsService {
  constructor(private prisma: PrismaService) {}

  create(createSprintDto: CreateSprintDto) {
    return this.prisma.sprints.create({
      data: createSprintDto as any,
    });
  }

  findAll() {
    return this.prisma.sprints.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.sprints.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateSprintDto: UpdateSprintDto) {
    return this.prisma.sprints.update({
      where: { id: BigInt(id) } as any,
      data: updateSprintDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.sprints.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
