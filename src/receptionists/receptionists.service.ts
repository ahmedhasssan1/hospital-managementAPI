import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { receptionist } from './entity/receptionist.entity';
import { Repository } from 'typeorm';
import { updateRecepcionst } from './dto/update.dto';
import { User } from 'src/user/entitiy/users.entity';

@Injectable()
export class ReceptionistsService {
    constructor(@InjectRepository(receptionist) private receRepo:Repository<receptionist>,
    @InjectRepository(User) private UserRepo:Repository<User>
){}

    async updatereceptionst(updateRece:updateRecepcionst,id:number){
        const findRece=await this.receRepo.findOne({where:{id},relations:['user']});
        if(!findRece){
            throw new NotFoundException('this receptionst not exist')
        }
        console.log('findRece:', findRece);
        await this.receRepo.update(id,{...updateRece})
        await this.UserRepo.update(findRece.user.id,{...updateRece})
        return findRece;

    }
    async  deleteReceptioninst(id:number){
        const findReceptionist=await this.receRepo.findOne({where:{id}})
        if(!findReceptionist){
            throw new NotFoundException("this receptionist not exist");
        }
        await this.receRepo.delete(findReceptionist.id)
        return {message:"this rece has been delted"}

    }
    async getallReciptionists(){
        const findAllreciptionists=await this.receRepo.find();
        if(!findAllreciptionists){
            throw new NotFoundException("no receptioinsts exist");
        }
        return findAllreciptionists
    }
}
