import { Patient } from "src/patients/typeOrm/patient.entity";
import { prescriptions } from "src/prescriptions/entity/prescripttion.entity";
import { Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"bils-patient"})
export class bilsPatient{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToMany(()=>Patient,(patient)=>patient.id,{onDelete:"CASCADE"})
    patient:Patient

    @ManyToMany(()=>prescriptions,(presc)=>presc.id,{onDelete:'CASCADE'})
    prescription:prescriptions
}