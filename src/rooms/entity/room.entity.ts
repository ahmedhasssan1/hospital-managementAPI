import { Patient } from "src/patients/typeOrm/patient.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'room'})
 export class Room{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    available:boolean;

    @Column()
    room_number:number

    @Column()
    typeOfRoom:string;

    @OneToMany(()=>Patient,(patient)=>patient.room)
    patient:Patient[];
    

}