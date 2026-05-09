import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.tasks.create({
      data: createTaskDto as any,
    });
  }

  findAll() {
    return this.prisma.tasks.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.tasks.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.tasks.update({
      where: { id: BigInt(id) } as any,
      data: updateTaskDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.tasks.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
