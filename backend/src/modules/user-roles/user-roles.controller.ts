import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-roles.dto';
import { UpdateUserRoleDto } from './dto/update-user-roles.dto';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userrolesService: UserRolesService) {}

  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userrolesService.create(createUserRoleDto);
  }

  @Get()
  findAll() {
    return this.userrolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userrolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userrolesService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userrolesService.remove(+id);
  }
}
