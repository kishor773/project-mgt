import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notifications.dto';
import { UpdateNotificationDto } from './dto/update-notifications.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notifications.create({
      data: createNotificationDto as any,
    });
  }

  findAll() {
    return this.prisma.notifications.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.notifications.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.prisma.notifications.update({
      where: { id: BigInt(id) } as any,
      data: updateNotificationDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.notifications.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
