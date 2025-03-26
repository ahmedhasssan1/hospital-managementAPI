import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nurse } from './typeorm/nurse.entity';
import { Repository } from 'typeorm';
import { createNurseDto } from './dto/createNurse.dto';

@Injectable()
export class NurseService {
    constructor(@InjectRepository(Nurse) private  nurseRepo:Repository<Nurse>){}
    
    async createNurse(createnurse:createNurseDto){
        const createNurse=this.nurseRepo.create({
            name:createnurse.name,
            shift:createnurse.shift
        })
        console.log('debugging ',createNurse);
        
        await this.nurseRepo.save(createNurse);
    }
}
