import { Injectable } from '@nestjs/common';
import { CreateTaskLabelDto } from './dto/create-task-labels.dto';
import { UpdateTaskLabelDto } from './dto/update-task-labels.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TaskLabelsService {
  constructor(private prisma: PrismaService) {}

  create(createTaskLabelDto: CreateTaskLabelDto) {
    return this.prisma.task_labels.create({
      data: createTaskLabelDto as any,
    });
  }

  findAll() {
    return this.prisma.task_labels.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.task_labels.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateTaskLabelDto: UpdateTaskLabelDto) {
    return this.prisma.task_labels.update({
      where: { id: BigInt(id) } as any,
      data: updateTaskLabelDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.task_labels.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
