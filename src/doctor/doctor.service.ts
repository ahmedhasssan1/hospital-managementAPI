import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './typeOrm/doctor.entity';
import { Repository } from 'typeorm';
// import { createDoctorDto } from './dto/createDoc.dto';
import * as argon from 'argon2';
import { createDoctorParam } from './dto/savedIndata';
import { Nurse } from 'src/nurse/typeorm/nurse.entity';
import { DocNurse, nurseDto } from './dto/doctorNurse.dto';
import { prescriptions } from 'src/prescriptions/entity/prescripttion.entity';
import { UpdateDocDto } from './dto/update.dto';
import { User } from 'src/user/entitiy/users.entity';
import { NurseService } from 'src/nurse/nurse.service';


@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
     private nurseRepo:NurseService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(prescriptions) private PrescRepo: Repository<prescriptions>,
    
  ) {}

  async createDoctor(createDoc: createDoctorParam):Promise<Partial<Doctor>> {
    const { password,name } = createDoc;
    const repeatedEmail=await this.doctorRepo.findOne({where:{name:name}})
    if (repeatedEmail){
      throw new UnauthorizedException('this user already exist');
    }
    
    const hashPassword = await argon.hash(password);
    const newDoc = this.doctorRepo.create({
        ...createDoc,
        password: hashPassword,
    });
    console.log('debugging ', newDoc);
    
    return this.doctorRepo.save(newDoc);
  }
  async addNurseToDoc(nurseDocDto:DocNurse):Promise<Partial<Doctor>>{
    const nurses:Nurse[]=[];
    const findNurse=await this.nurseRepo.findNurse(nurseDocDto.id);
    if(!findNurse){
      throw new NotFoundException('this nurse not existing')
    }
    
    
    nurses.push(findNurse);
    const findDoc=await this.doctorRepo.findOne({where:{name:nurseDocDto.doctorName},relations:['nurses']})
    if(!findDoc){
      throw new NotFoundException("this user is not exist")
    }
  if(findDoc.nurses.some((nurse)=>nurse.id===findNurse.id)){
    throw new UnauthorizedException('this nurse already  exit with that doctor')
  }

 
    findDoc.nurses=[findNurse];
    const updateDoc= await this.doctorRepo.save(findDoc);
    return updateDoc;

  }
  async getDoc(id:number):Promise<{patients:any[],nurses:any[]}>{
    const findDoctor=await this.doctorRepo.findOne({where:{id},relations:['nurses','patients','patients.room','patients.prescription']})
    if(!findDoctor){
      throw new UnauthorizedException ("this doctor is not exist")
      
    }
    return findDoctor;
  }
  async deleteNurseFromDocoor(id:number,NurseDoc:nurseDto):Promise<{message:string}>{
     const doctor=await this.doctorRepo.findOne({where:{id},relations:['nurses']})
     if(!doctor){
      throw new NotFoundException("this doctor no more exist");
    }
    const nurse=await this.nurseRepo.findNurse(NurseDoc.id)
    if(!nurse){
      throw new NotFoundException("this nurse not exist") 
    }
    const nurseAccistedWithDoc= doctor.nurses.findIndex((n)=>n.id===nurse.id)
    if(nurseAccistedWithDoc===-1){
      throw new NotFoundException("this nurse not with this doctor");
    }

    doctor.nurses.splice(nurseAccistedWithDoc,1);
    await this.doctorRepo.save(doctor);

    return { message: 'Nurse removed from the doctor successfully' };



  }
  async updateDoctor(updateDto:UpdateDocDto,id:number){
    const findDoc=await this.doctorRepo.findOne({where:{id},relations:['user_id']});
    if(!findDoc){
      throw new NotFoundException("this doctor not exist")
    }
    await this.doctorRepo.update(id,{...updateDto})
    const finduser=await this.userRepo.findOne({where:{id:findDoc.user_id.id}});
    if(!finduser){
      throw new NotFoundException("this user not exist (doctor)");
    }

    await this.userRepo.update(findDoc.user_id.id,{...updateDto})


    return await this.doctorRepo.findOne({where:{id}})

  }
  async getAllDoctors(){
    const doctors=await this.doctorRepo.find();
    if(!doctors){
      throw new NotFoundException("no doctor exist")
    }
    return doctors
  }
  
}
