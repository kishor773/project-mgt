import { Injectable } from '@nestjs/common';
import { CreateProjectMemberDto } from './dto/create-project-members.dto';
import { UpdateProjectMemberDto } from './dto/update-project-members.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectMembersService {
  constructor(private prisma: PrismaService) {}

  create(createProjectMemberDto: CreateProjectMemberDto) {
    return this.prisma.project_members.create({
      data: createProjectMemberDto as any,
    });
  }

  findAll() {
    return this.prisma.project_members.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.project_members.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateProjectMemberDto: UpdateProjectMemberDto) {
    return this.prisma.project_members.update({
      where: { id: BigInt(id) } as any,
      data: updateProjectMemberDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.project_members.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
