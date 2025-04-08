import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { medicalAppointments } from './entity/appointemnt.entity';
import { Repository } from 'typeorm';
import { createAppointementDto } from './dto/create.dto';
import { Patient } from 'src/patients/typeOrm/patient.entity';
import { updateAppointmentDto } from './dto/update.dto';

@Injectable()
export class MeddicalAppointemtsService {
    constructor(@InjectRepository(medicalAppointments) private appointmentRepo:Repository<medicalAppointments>,
    @InjectRepository(Patient) private patientRepo:Repository<Patient>
){}

    async createAppointement(createAppointement:createAppointementDto,){
        const patient=await this.patientRepo.findOne({where:{id:createAppointement.patient_id},relations:["doctor"]});
        if(!patient){
            throw new NotFoundException("this patient not any more exist");
        }
        const createAppo= this.appointmentRepo.create({
            patient_id:patient,
            date:createAppointement.date,
            status:createAppointement.status,
            description:createAppointement.description


        })
        const saveAppointment= await this.appointmentRepo.save(createAppo)
        return saveAppointment;

    }
    async deleteAppointment(id:number){
        const appointemnt=await this.appointmentRepo.delete(id)
        if(!appointemnt){
            throw new NotFoundException("this appintment not exist")
        }
        return{messgae:"this appointment has been delted"}

    }
    async updateAppointment(updateAppoDto:updateAppointmentDto){
        const appointemnt=await this.appointmentRepo.update(updateAppoDto.id,{...updateAppoDto});
        if(!appointemnt){
            throw new NotFoundException("this appointemnt not exist ");
        }
        return {message:"this appointment has been updated",
            rowsAffected:appointemnt.affected
        };

    }
    async getAppo(id:number){
        const appointemnt=await this.appointmentRepo.findOne({where:{id}})
        
        if(!appointemnt){
            throw new NotFoundException("there is no appointment with this id");
        }
        return appointemnt;
        
    }   
}
