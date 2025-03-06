import { Patient } from "src/patients/typeOrm/patient.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'ACCOUNTS'})
export class Account{

    @PrimaryGeneratedColumn()
    id:number;

    // @OneToMany(() => Doctor, (doctor) => doctor.user)
    // doctors: Doctor[];

    @Column()
    name:string;

    @Column()
    age:number

    @Column()
    gender:string;

    @Column()
    contact:string;

    @Column()
    role:string;

    @OneToMany(() => Patient, patient => patient.user)
    patients: Patient[];



}

