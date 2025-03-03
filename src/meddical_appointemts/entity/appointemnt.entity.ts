import { Doctor } from "src/doctor/typeOrm/doctor.entity";
import { Patient } from "src/patients/typeOrm/patient.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'appointment'})
export class medicalAppointments{
    @PrimaryGeneratedColumn()
    id:number;


    @ManyToOne(()=>Patient,(patient)=>patient.medicalAppointments,{onDelete:"CASCADE"})
    patient_id:Patient;

   @ManyToOne(() => Doctor, (doctor) => doctor.medicalAppointments, { onDelete: "CASCADE" }) 
   doctor: Doctor; // Foreign key reference to DOCTORS.ID

  @Column({ type: "timestamp" }) 
  date: Date;

  @Column({ type: "varchar", length: 20 })
  status: string; 

  @Column({ type: "text", nullable: true })
  description: string; 

}