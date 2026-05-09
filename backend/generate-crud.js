const fs = require('fs');
const path = require('path');

const modules = [
  { dir: 'activity-logs', model: 'activity_logs', name: 'ActivityLogs', singular: 'ActivityLog' },
  { dir: 'attachments', model: 'attachments', name: 'Attachments', singular: 'Attachment' },
  { dir: 'board-columns', model: 'board_columns', name: 'BoardColumns', singular: 'BoardColumn' },
  { dir: 'comments', model: 'comments', name: 'Comments', singular: 'Comment' },
  { dir: 'labels', model: 'labels', name: 'Labels', singular: 'Label' },
  { dir: 'milestones', model: 'milestones', name: 'Milestones', singular: 'Milestone' },
  { dir: 'notifications', model: 'notifications', name: 'Notifications', singular: 'Notification' },
  { dir: 'organizations', model: 'organizations', name: 'Organizations', singular: 'Organization' },
  { dir: 'project-members', model: 'project_members', name: 'ProjectMembers', singular: 'ProjectMember' },
  { dir: 'projects', model: 'projects', name: 'Projects', singular: 'Project' },
  { dir: 'roles', model: 'roles', name: 'Roles', singular: 'Role' },
  { dir: 'sprints', model: 'sprints', name: 'Sprints', singular: 'Sprint' },
  { dir: 'task-dependencies', model: 'task_dependencies', name: 'TaskDependencies', singular: 'TaskDependency' },
  { dir: 'task-labels', model: 'task_labels', name: 'TaskLabels', singular: 'TaskLabel' },
  { dir: 'tasks', model: 'tasks', name: 'Tasks', singular: 'Task' },
  { dir: 'time-logs', model: 'time_logs', name: 'TimeLogs', singular: 'TimeLog' },
  { dir: 'user-roles', model: 'user_roles', name: 'UserRoles', singular: 'UserRole' },
  { dir: 'users', model: 'users', name: 'Users', singular: 'User' },
];

const srcDir = path.join(__dirname, 'src', 'modules');

modules.forEach(({ dir, model, name, singular }) => {
  const moduleDir = path.join(srcDir, dir);
  const dtoDir = path.join(moduleDir, 'dto');
  
  if (!fs.existsSync(dtoDir)) {
    fs.mkdirSync(dtoDir, { recursive: true });
  }

  // Create DTOs
  const createDtoName = `create-${dir}.dto.ts`;
  const updateDtoName = `update-${dir}.dto.ts`;
  
  const createDtoContent = `export class Create${singular}Dto {}
`;
  const updateDtoContent = `import { PartialType } from '@nestjs/mapped-types';
import { Create${singular}Dto } from './${createDtoName.replace('.ts', '')}';

export class Update${singular}Dto extends PartialType(Create${singular}Dto) {}
`;

  fs.writeFileSync(path.join(dtoDir, createDtoName), createDtoContent);
  fs.writeFileSync(path.join(dtoDir, updateDtoName), updateDtoContent);

  // Controller
  const controllerName = `${dir}.controller.ts`;
  const controllerContent = `import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ${name}Service } from './${dir}.service';
import { Create${singular}Dto } from './dto/create-${dir}.dto';
import { Update${singular}Dto } from './dto/update-${dir}.dto';

@Controller('${dir}')
export class ${name}Controller {
  constructor(private readonly ${dir.replace(/-/g, '')}Service: ${name}Service) {}

  @Post()
  create(@Body() create${singular}Dto: Create${singular}Dto) {
    return this.${dir.replace(/-/g, '')}Service.create(create${singular}Dto);
  }

  @Get()
  findAll() {
    return this.${dir.replace(/-/g, '')}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${dir.replace(/-/g, '')}Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update${singular}Dto: Update${singular}Dto) {
    return this.${dir.replace(/-/g, '')}Service.update(+id, update${singular}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${dir.replace(/-/g, '')}Service.remove(+id);
  }
}
`;
  fs.writeFileSync(path.join(moduleDir, controllerName), controllerContent);

  // Service
  const serviceName = `${dir}.service.ts`;
  // We handle composite ID entities differently if needed, but for now we just assume a generic method or use standard prisma methods.
  // Actually, some tables might have composite keys or id as BigInt.
  // Prisma requires BigInt for bigints. Wait, BigInt is usually handled by passing BigInt(id) or if it's auto-incrementing. 
  // Let's just pass BigInt(id) if the id is numeric string in the service, but let's just assume BigInt.
  const serviceContent = `import { Injectable } from '@nestjs/common';
import { Create${singular}Dto } from './dto/create-${dir}.dto';
import { Update${singular}Dto } from './dto/update-${dir}.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ${name}Service {
  constructor(private prisma: PrismaService) {}

  create(create${singular}Dto: Create${singular}Dto) {
    return this.prisma.${model}.create({
      data: create${singular}Dto as any,
    });
  }

  findAll() {
    return this.prisma.${model}.findMany();
  }

  findOne(id: number) {
    // Note: Assuming 'id' is single numeric BigInt primary key for simplicity.
    // Adjust if composite key or UUID.
    return this.prisma.${model}.findUnique({
      where: { id: BigInt(id) } as any,
    });
  }

  update(id: number, update${singular}Dto: Update${singular}Dto) {
    return this.prisma.${model}.update({
      where: { id: BigInt(id) } as any,
      data: update${singular}Dto as any,
    });
  }

  remove(id: number) {
    return this.prisma.${model}.delete({
      where: { id: BigInt(id) } as any,
    });
  }
}
`;
  fs.writeFileSync(path.join(moduleDir, serviceName), serviceContent);
});

console.log('CRUD generation complete!');
