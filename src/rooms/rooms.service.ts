import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entity/room.entity';
import { Repository } from 'typeorm';
import { CreataRoomDto } from './dto/createRoom.dto';

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private roomService:Repository<Room>){}
    async createRoom(createRoom:CreataRoomDto){
        const room=this.roomService.create({
            room_number:createRoom.room_number,
            available:createRoom.available,
            typeOfRoom:createRoom.typeOFRoom
        })
        const findRoom=await this.roomService.find({where:{room_number:createRoom.room_number}})
        if(findRoom){
            throw new UnauthorizedException('this room already exist');
        }
        
        
        await this.roomService.save(room);
        return 'room added succesfully';
        
    }
}
