import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreataRoomDto, updateRoom } from './dto/createRoom.dto';
import { updateDto } from 'src/user/dto/update.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('newRoom')
  async createRoom(@Body() createDto:CreataRoomDto){
    return this.roomsService.createRoom(createDto);
  }
  @Post('updateRoom')
  async updateRoom(@Body() updatedto:updateRoom){
     return this.roomsService.availableRoom(updatedto)
  }
  
}
