import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { userServices } from './user.service';

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
    return this.userservice.updateUSer(id, updateuser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userservice.deleteUser(id);
  }
}
