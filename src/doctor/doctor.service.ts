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
import { identity } from 'rxjs';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    @InjectRepository(Nurse) private nurseRepo: Repository<Nurse>,
    @InjectRepository(prescriptions) private PrescRepo: Repository<prescriptions>,
    
  ) {}

  async createDoctor(createDoc: createDoctorParam) {
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
  async addNurseToDoc(nurseDocDto:DocNurse){
    const nurses:Nurse[]=[];
    const findNurse=await this.nurseRepo.findOne({where:{name:nurseDocDto.nurseName}
    });
    if(!findNurse){
      throw new UnauthorizedException('this nurse not existing')
    }
    
    nurses.push(findNurse);
    const findDoc=await this.doctorRepo.findOne({where:{name:nurseDocDto.doctorName},relations:['nurses']})
    if(!findDoc){
      throw new UnauthorizedException("rhis user is not exist")
    }

 
    findDoc.nurses=[findNurse];



    const updateDoc= await this.doctorRepo.save(findDoc);
    const {password,...doctorWithoutPassword}=updateDoc;
    return doctorWithoutPassword;

  }
  async getDoc(name:string){
    const findDoctor=await this.doctorRepo.findOne({where:{name:name},relations:['nurses','patients','patients.room','patients.prescription']})
    if(!findDoctor){
      throw new UnauthorizedException("this doctor is not exist")
      
    }
    
    
    const patients=findDoctor.patients.map((ele)=>({
      name:ele.name,
      contact_info:ele.contact_info,
      room:ele.room,
      prescription:ele.prescription
     
      
    }))
    const nurses=findDoctor.nurses.map((ele)=>({
      name:ele.name,
      
    }))
    console.log('debugging eoom',patients);
    
    const {password,...updateDoc}=findDoctor
    return {patients,nurses};
  }
  async deleteNurseFromDocoor(id:number,NurseDoc:nurseDto){
     const doctor=await this.doctorRepo.findOne({where:{id},relations:['nurses']})
     if(!doctor){
      throw new NotFoundException("this doctor no more exist");
    }
    const nurse=await this.nurseRepo.findOne({where:{name:NurseDoc.nurse}})
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
  
}
