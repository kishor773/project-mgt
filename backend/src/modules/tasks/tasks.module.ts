import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../../prisma/prisma.service';
import { WebsocketGateway } from '../../websocket/websocket.gateway';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    PrismaService,
    WebsocketGateway
  ]
})
export class TasksModule {}
