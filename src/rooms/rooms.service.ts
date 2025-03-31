import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entity/room.entity';
import { Repository } from 'typeorm';
import { CreataRoomDto, updateRoom } from './dto/createRoom.dto';

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private roomService:Repository<Room>){}
    async createRoom(createRoom:CreataRoomDto){
        const room=this.roomService.create({
            room_number:createRoom.room_number,
            available:createRoom.available,
            typeOfRoom:createRoom.typeOFRoom
        })
        const findRoom=await this.roomService.findOne({where:{room_number:createRoom.room_number}})
        if(findRoom){
            throw new UnauthorizedException('this room already exist');
        }
        
        
        await this.roomService.save(room);
        return 'room added succesfully';
        
    }
    async availableRoom(updateDto:updateRoom){
        const findRoom=await this.roomService.update({room_number:updateDto.room_number},{available:true});
       
        return {message:'room available now'};
    }
}
