import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto as any,
    });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.users.findUnique({
      where: { id: BigInt(id) } as any,
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
