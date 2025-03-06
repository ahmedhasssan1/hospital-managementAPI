import { Doctor } from "src/doctor/typeOrm/doctor.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'nurse'})
export class Nurse{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Doctor,doctor=>doctor.nurses)
    doctor:Doctor;

    @Column()
    shift:string;

}