import { Injectable } from '@nestjs/common';
import { CreateTimeLogDto } from './dto/create-time-logs.dto';
import { UpdateTimeLogDto } from './dto/update-time-logs.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TimeLogsService {
  constructor(private prisma: PrismaService) {}

  create(createTimeLogDto: CreateTimeLogDto) {
    return this.prisma.time_logs.create({
      data: createTimeLogDto as any,
    });
  }

  findAll() {
    return this.prisma.time_logs.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.time_logs.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, updateTimeLogDto: UpdateTimeLogDto) {
    return this.prisma.time_logs.update({
      where: { id: BigInt(id) } as any,
      data: updateTimeLogDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.time_logs.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
