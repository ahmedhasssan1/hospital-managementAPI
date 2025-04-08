import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prescriptions } from './entity/prescripttion.entity';
import { Repository } from 'typeorm';
import { createDto } from './dto/create.dto';
import { Patient } from 'src/patients/typeOrm/patient.entity';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';
import { updateDto } from './dto/update.dto';

@Injectable()
export class PrescriptionsService {
    constructor(@InjectRepository(prescriptions) private  prescreptionRepo:Repository<prescriptions>,
    @InjectRepository(Patient) private  PatientService:Repository<Patient>,
    @InjectRepository(Doctor) private  DocotorRepo:Repository<Doctor>
    
){}

    async createPrescription(creatPresc:createDto){
        const findpatient=await this.PatientService.findOne({where:{id:creatPresc.patient},relations:['doctor']})
        if(!findpatient){
            throw new NotFoundException("this patient not exist");
        }
        const patientDoctor=await this.DocotorRepo.findOne({where:{id:findpatient.doctor?.id}});
        if(!patientDoctor){
            throw new NotFoundException("this doctor not exist")
        }
        // const patient=await this.PatientService.findOne({where:{id:creatPresc.patient}})
        // const addPresToPatient=patient?.prescription=creatPresc.prescrption
        const newPresc=this.prescreptionRepo.create({
            patient:findpatient,
            doctorName:patientDoctor.name,
            patientName:findpatient.name,
            medcation_text:creatPresc.prescrption
        })
        const savedPresc=await this.prescreptionRepo.save(newPresc);
         return {docotrName:savedPresc.doctorName,
            aptientName:savedPresc.patientName,
            medication_description:savedPresc.medcation_text
            
         }
    }
    async getPatientPresc(id:number){
        const getPatientPresc=await this.PatientService.findOne({where:{id},relations:["prescription"]});
        if(!getPatientPresc){
            throw new NotFoundException('patient not exist');
        }
        
        // const getPrescforPatient=await this.prescreptionRepo.findOne({where:{patient:{id:getPatientPresc.id}}})
        
        // if(!getPrescforPatient){
        //     throw new NotFoundException("no medication exist for this patient")
        // }
        
        return getPatientPresc;

    }
    async updatePresc(updateDto:updateDto,id:number){
        const findPatient=await this.PatientService.findOne({where:{id}})
        if(!findPatient){
            throw new NotFoundException("this patient not exit any more")
        }
        const findPresc=await this.prescreptionRepo.update({patient:{id}},{...updateDto})
        if(!findPresc){
            throw new NotFoundException("this presc not exit")
        }
        return await this.prescreptionRepo.findOne({where:{id}});


    }
    async deletePresc(id:number){
        const findPatient=await this.PatientService.findOne({where:{id}})
        if(!findPatient){
            throw new NotFoundException("this patient not exit")
        }

        await this.prescreptionRepo.delete({patient:findPatient});
    
        return 'Prescriptions deleted successfully for the patient';

    }
}
