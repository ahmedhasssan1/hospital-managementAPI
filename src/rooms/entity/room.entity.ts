import { Patient } from "src/patients/typeOrm/patient.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'room'})
 export class Room{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    available:boolean;

    

    @Column()
    typeOfRoom:string;

    @ManyToOne(()=>Patient,(patient)=>patient.rooms)
    patient:Patient;
    

}