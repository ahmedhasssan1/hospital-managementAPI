import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './typeOrm/patient.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';
import { addDoc } from './dto/addDoc.dto';
import { RoomPatientDto } from './dto/roomPatient.dto';
import { Room } from 'src/rooms/entity/room.entity';

@Injectable()
export class PatientsService {
    constructor(@InjectRepository(Patient) private PatientRepo:Repository<Patient>,
    @InjectRepository(Doctor) private DocRepo:Repository<Doctor>,
    @InjectRepository(Room) private RoomRepo:Repository<Room>

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
    async addRoomToPatient(roomPatient:RoomPatientDto){
        const patient=await this.PatientRepo.findOne({where:{id:roomPatient.patientID}})
        if(!patient || patient.room){
            throw new NotFoundException("this patient not exist or already it has room")
        }
        const room=await this.RoomRepo.findOne({where:{id:roomPatient.roomID}})
        if(!room || !room.available){
            throw new NotFoundException("this room not exist or room busy")
        }
        patient.room=room;
        room.available=false;
        
        await this.PatientRepo.save(patient);
        await this.RoomRepo.save(room);
        
        return { message: "Room assigned to patient successfully", patient };


    }  
    async getAllPatients(){
        const patients=await this.PatientRepo.find();
        if(!patients){
            throw new NotFoundException('there is no patients');
        }
        return patients;
    }    
}
