import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const createData = { ...createUserDto } as any;
    const organizationId = createData.organization_id != null ? BigInt(createData.organization_id) : undefined;
    const roleId = createData.role_id != null ? BigInt(createData.role_id) : undefined;

    delete createData.organization_id;
    delete createData.role_id;

    if (!roleId) {
      throw new BadRequestException('role_id is required to create a user role record');
    }

    const orgToConnect = organizationId
      ? { id: organizationId }
      : (await this.prisma.organizations.findFirst({ select: { id: true } }));

    if (!orgToConnect || !orgToConnect.id) {
      throw new BadRequestException(
        'organization_id is required to create a user, or an organization must already exist to attach to'
      );
    }

    return this.prisma.users.create({
      data: {
        ...createData,
        organizations: {
          connect: { id: orgToConnect.id },
        },
        user_roles: {
          create: {
            role_id: roleId,
          },
        },
      },
      include: {
        user_roles: {
          include: {
            roles: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.users.findMany({
      include: {
        user_roles: {
          include: {
            roles: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.users.findUnique({
      where: { id: BigInt(id) } as any,
      include: {
        user_roles: {
          include: {
            roles: true,
          },
        },
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id: BigInt(id) } as any,
      data: updateUserDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
