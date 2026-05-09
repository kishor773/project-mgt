import { Injectable } from '@nestjs/common';
import { CreateTaskDependencyDto } from './dto/create-task-dependencies.dto';
import { UpdateTaskDependencyDto } from './dto/update-task-dependencies.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TaskDependenciesService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDependencyDto: CreateTaskDependencyDto) {
    return this.prisma.task_dependencies.create({
      data: createTaskDependencyDto as any,
    });
  }

  findAll() {
    return this.prisma.task_dependencies.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.task_dependencies.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateTaskDependencyDto: UpdateTaskDependencyDto) {
    return this.prisma.task_dependencies.update({
      where: { id: BigInt(id) } as any,
      data: updateTaskDependencyDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.task_dependencies.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
