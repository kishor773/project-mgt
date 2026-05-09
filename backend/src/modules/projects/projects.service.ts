import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto) {
    return this.prisma.projects.create({
      data: createProjectDto as any,
    });
  }

  findAll() {
    return this.prisma.projects.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.projects.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.projects.update({
      where: { id: BigInt(id) } as any,
      data: updateProjectDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.projects.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
