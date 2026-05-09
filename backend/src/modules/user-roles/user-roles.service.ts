import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-roles.dto';
import { UpdateUserRoleDto } from './dto/update-user-roles.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRolesService {
  constructor(private prisma: PrismaService) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    return this.prisma.user_roles.create({
      data: createUserRoleDto as any,
    });
  }

  findAll() {
    return this.prisma.user_roles.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.user_roles.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return this.prisma.user_roles.update({
      where: { id: BigInt(id) } as any,
      data: updateUserRoleDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.user_roles.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
