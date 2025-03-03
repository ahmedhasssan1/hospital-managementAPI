import { Account } from "src/common/entities/account.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'nurse'})
export class Nurse{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Account)
    account:Account;

    @ManyToOne(()=>Account)
    doctor:Account;

    @Column()
    shift:string;

}