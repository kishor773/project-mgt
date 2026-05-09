import { Injectable } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity-logs.dto';
import { UpdateActivityLogDto } from './dto/update-activity-logs.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ActivityLogsService {
  constructor(private prisma: PrismaService) {}

  create(createActivityLogDto: CreateActivityLogDto) {
    return this.prisma.activity_logs.create({
      data: createActivityLogDto as any,
    });
  }

  findAll() {
    return this.prisma.activity_logs.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.activity_logs.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateActivityLogDto: UpdateActivityLogDto) {
    return this.prisma.activity_logs.update({
      where: { id: BigInt(id) } as any,
      data: updateActivityLogDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.activity_logs.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
