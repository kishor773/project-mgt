import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-roles.dto';
import { UpdateUserRoleDto } from './dto/update-user-roles.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRolesService {
  constructor(private prisma: PrismaService) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const data = createUserRoleDto as any;

    if (data.user_id == null || data.role_id == null) {
      throw new BadRequestException('user_id and role_id are required to create a user role');
    }

    const userId = BigInt(data.user_id);
    const roleId = BigInt(data.role_id);

    const existing = await this.prisma.user_roles.findFirst({
      where: {
        user_id: userId,
        role_id: roleId,
      },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.user_roles.create({
      data: {
        ...data,
        user_id: userId,
        role_id: roleId,
      },
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
