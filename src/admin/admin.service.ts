import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { Repository } from 'typeorm';
import { updateAdminDto } from './dto/update.dto';
import { User } from 'src/user/entitiy/users.entity';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(Admin) private AdminRepo:Repository<Admin>,
    @InjectRepository(User) private UserRepo:Repository<User>
){}

    async updateAdmin(updateDto:updateAdminDto):Promise<Admin>{
        const findAdmin=await this.AdminRepo.findOne({where:{id:updateDto.id},relations:['user']})
        if(!findAdmin){
            throw new NotFoundException('this admin no  exist anymore')
        }
        console.log('debugging ',findAdmin);
        
        await this.AdminRepo.update(updateDto.id,{...updateDto});
        // await this.UserRepo.update(findAdmin.user.id,{...updateDto})
        return findAdmin
    }
    async getAllAdmins(){
        const AllAdmin=await this.AdminRepo.find();
        if(!AllAdmin){
            throw new NotFoundException("there is no admins")
        }
        return AllAdmin;
    }
    async delteAdmin(id:number){
        const admin=await this.AdminRepo.delete(id);
        if(!admin){
            throw new NotFoundException("there is no admin exist with this id")
        }
        return {message:"this admin uas been deleted"}
    }
}
