import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entity/room.entity';
import { Repository } from 'typeorm';
import { CreataRoomDto, updateRoom } from './dto/createRoom.dto';

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private roomRepo:Repository<Room>){}
    async createRoom(createRoom:CreataRoomDto){
        const room=this.roomRepo.create({
            room_number:createRoom.room_number,
            available:createRoom.available,
            typeOfRoom:createRoom.typeOFRoom
        })
        const findRoom=await this.roomRepo.findOne({where:{room_number:createRoom.room_number}})
        if(findRoom){
            throw new UnauthorizedException('this room already exist');
        }
        
        
        await this.roomRepo.save(room);
        return 'room added succesfully';
        
    }
    async availableRoom(updateDto:updateRoom){
        const findRoom = await this.roomRepo.findOne({ where: { room_number: updateDto.room_number } });
    if (!findRoom) {
        throw new NotFoundException("This room no longer exists");
    }
    await this.roomRepo.update({ room_number: updateDto.room_number }, { available: true });

        return {message:'room available now'};
    }
    async getAllRoom():Promise<Room[]>{
        const allRooms=await this.roomRepo.find();
        return allRooms;
    }
    async getFreeRooms():Promise<Room[]>{
        const FreeRooms=await this.roomRepo.find({where:{available:true}});
        return FreeRooms;
    }
    async deleteRoom(id:number){
        const room=await this.roomRepo.findOne({where:{id}});
        if(!room){
            throw new NotFoundException("this room not exist");
        }
        await this.roomRepo.delete(id)
        return {message:`the room with id ${id}  has been deleted`,room}
    }
}
