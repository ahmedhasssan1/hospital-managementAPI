import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreataRoomDto, updateRoom } from './dto/createRoom.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('newRoom')
  async createRoom(@Body() createDto:CreataRoomDto){
    return this.roomsService.createRoom(createDto);
  }
  @Patch('updateRoom')
  async updateRoom(@Body() updatedto:updateRoom){
     return this.roomsService.availableRoom(updatedto)
  }
  @Get('allRooms')
  allRooms(){
    return this.roomsService.getAllRoom();
  }
  @Get('freeRooms')
  freeRooms(){
    return this.roomsService.getFreeRooms()
  }
  @Delete(":id")
  deleteRoom(@Param('id',ParseIntPipe)id:number){
    return this.roomsService.deleteRoom(id);
  }
  
}
