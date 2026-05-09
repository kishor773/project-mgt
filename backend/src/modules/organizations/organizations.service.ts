import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organizations.dto';
import { UpdateOrganizationDto } from './dto/update-organizations.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    return this.prisma.organizations.create({
      data: createOrganizationDto as any,
    });
  }

  findAll() {
    return this.prisma.organizations.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.organizations.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return this.prisma.organizations.update({
      where: { id: BigInt(id) } as any,
      data: updateOrganizationDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.organizations.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
