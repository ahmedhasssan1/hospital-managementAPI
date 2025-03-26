import { Doctor } from "src/doctor/typeOrm/doctor.entity";
import { Patient } from "src/patients/typeOrm/patient.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'prescriprions'})
export class prescriprions{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>Patient,(patient)=>patient.prescription,{onDelete:"CASCADE"})
     patient_id:prescriprions;
    
    @ManyToOne(()=>Doctor,(doctor)=>doctor.prescription )
    doctor_id:Doctor;

    @Column({type:"text"})
    mesication_text:string;


}