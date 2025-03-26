import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreataRoomDto } from './dto/createRoom.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('newRoom')
  async createRoom(@Body() createDto:CreataRoomDto){
    return this.roomsService.createRoom(createDto);
  }
}
