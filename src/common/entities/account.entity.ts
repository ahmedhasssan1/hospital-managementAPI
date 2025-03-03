import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'ACCOUNTS'})
export class Account{

    @PrimaryGeneratedColumn()
    id:number;

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



}