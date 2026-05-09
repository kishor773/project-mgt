import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectMembersService } from './project-members.service';
import { CreateProjectMemberDto } from './dto/create-project-members.dto';
import { UpdateProjectMemberDto } from './dto/update-project-members.dto';

@Controller('project-members')
export class ProjectMembersController {
  constructor(private readonly projectmembersService: ProjectMembersService) {}

  @Post()
  create(@Body() createProjectMemberDto: CreateProjectMemberDto) {
    return this.projectmembersService.create(createProjectMemberDto);
  }

  @Get()
  findAll() {
    return this.projectmembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectmembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectMemberDto: UpdateProjectMemberDto) {
    return this.projectmembersService.update(+id, updateProjectMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectmembersService.remove(+id);
  }
}
