import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { RolesModule } from './modules/roles/roles.module';
import { ProjectMembersModule } from './modules/project-members/project-members.module';
import { MilestonesModule } from './modules/milestones/milestones.module';
import { SprintsModule } from './modules/sprints/sprints.module';
import { LabelsModule } from './modules/labels/labels.module';
import { BoardColumnsModule } from './modules/board-columns/board-columns.module';
import { TaskLabelsModule } from './modules/task-labels/task-labels.module';
import { TaskDependenciesModule } from './modules/task-dependencies/task-dependencies.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { TimeLogsModule } from './modules/time-logs/time-logs.module';
import { ActivityLogsModule } from './modules/activity-logs/activity-logs.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { UserRolesModule } from './modules/user-roles/user-roles.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TasksModule,
    UsersModule,
    ProjectsModule,
    OrganizationsModule,
    RolesModule,
    ProjectMembersModule,
    MilestonesModule,
    SprintsModule,
    LabelsModule,
    BoardColumnsModule,
    TaskLabelsModule,
    TaskDependenciesModule,
    CommentsModule,
    AttachmentsModule,
    TimeLogsModule,
    ActivityLogsModule,
    NotificationsModule,
    UserRolesModule
  ],
  providers: [
    WebsocketGateway
  ]
})
export class AppModule {}
