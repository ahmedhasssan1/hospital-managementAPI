import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { createDto } from './dto/create.dto';
import { updateDto, updateUser } from './dto/update.dto';
import { userServices } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/rolesAuth/role.guard';
import { Roles } from './auth/rolesAuth/role.descerotaor';
import { USerRole } from 'src/common/enum/Role.enum';

@Controller('users')
export class UserController {
  constructor(private userservice: userServices) {}
  @Get()
  findUser() {
    return this.userservice.findUsers();
  }

  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userservice.findOneUser(id);
  }

  @Post()
  createUser(@Body() createdto: createDto) {
    return this.userservice.createUser(createdto);
  }

  @Patch(':id')
  updateuserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateuser: updateDto,
  ) {
    return this.userservice.updateUser(id, updateuser);
  }
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Patch(':id')
  @Roles(USerRole.admin)
  updateprofile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateuser: updateUser,
  ) {
    return this.userservice.updateUser(id, updateuser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userservice.deleteUser(id);
  }
}
