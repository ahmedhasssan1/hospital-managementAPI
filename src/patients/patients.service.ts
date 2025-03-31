import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './typeOrm/patient.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';

@Injectable()
export class PatientsService {
    constructor(@InjectRepository(Patient) private PatientRepo:Repository<Patient>,
    @InjectRepository(Doctor) private DocRepo:Repository<Doctor>

){}

    async findPatient(id:number){
        const findPatient=await this.PatientRepo.findOne({where:{id},relations:['doctor','room','prescription','medicalAppointments']});
        return findPatient;

    }
    async removeDoctorFromPatient(id:number){
        const findpatient=await this.PatientRepo.update(id,{doctor:null})
        if(!findpatient){
            throw new NotFoundException('this patien not exist');
        }
       
        return{message:"the doctor has been removed from this patient"};

    }
    async addDoctor(docDto:addDoc,id:number){
        const findPatient=await this.PatientRepo.findOne({where:{id}})
        if(!findPatient){
            throw new NotFoundException("this patient not exist")
        }
        const doctor=await this.DocRepo.findOne({where:{id:docDto.id}})
        
        if(!doctor){
            throw new NotFoundException("this doctor not exist")
        }   
        findPatient.doctor=doctor;
        await this.PatientRepo.save(findPatient);
        return{message:"doctor added succesfully"};
        
    }       
}
