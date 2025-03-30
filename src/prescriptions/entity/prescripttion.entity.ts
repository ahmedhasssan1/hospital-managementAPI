import { Patient } from "src/patients/typeOrm/patient.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'prescriprions'})
export class prescriptions{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>Patient,(patient)=>patient.prescription,{onDelete:"CASCADE"})
    patient:Patient;
    
    
    
  
    @Column({type:"text"})
    medcation_text:string;

    @Column()
    doctorName:string
  
    @Column()
    patientName:string
  
}