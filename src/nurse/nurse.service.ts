import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nurse } from './typeorm/nurse.entity';
import { Repository } from 'typeorm';
import { createNurseDto } from './dto/createNurse.dto';
import { updateNurseDto } from './dto/update.dto';
import { User } from 'src/common/entities/users.entity';

@Injectable()
export class NurseService {
    constructor(@InjectRepository(Nurse) private  nurseRepo:Repository<Nurse>,
@InjectRepository(User) private userRepo:Repository<User>){}
    
    async createNurse(createnurse:createNurseDto){
        const createNurse=this.nurseRepo.create({
            name:createnurse.name,
            shift:createnurse.shift
        })
        console.log('debugging ',createNurse);
        
        await this.nurseRepo.save(createNurse);
    }
    async updateNurse(updateNurseDto:updateNurseDto,id:number){
        const findNurse=await this.nurseRepo.findOne({where:{id}});
        if(!findNurse){
            throw new UnauthorizedException('this nurse no longer exist')
        }
        await this.userRepo.update({ id: findNurse.user_id.id }, { ...updateNurseDto });
        await this.nurseRepo.update({id},{...updateNurseDto});
        return await this.nurseRepo.findOne({where:{id}})

    }
    
}
