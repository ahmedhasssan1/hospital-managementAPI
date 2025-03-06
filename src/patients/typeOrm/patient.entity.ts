import { Account } from "src/common/entities/account.entity";
import { medicalAppointments } from "src/meddical_appointemts/entity/appointemnt.entity";
import { prescriprions } from "src/prescriptions/entity/prescripttion.entity";
import { Room } from "src/rooms/entity/room.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'patient'})
export class Patient{
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(() => Account, account => account.patients)
    user: Account;

    @Column()
    inital_diagnosis:string;

    
    @OneToMany(() => Room,(room) => room.patient)
    rooms: Room[];

    @OneToMany(() => medicalAppointments, (medicalAppointments) => medicalAppointments.patient_id)
   medicalAppointments: medicalAppointments[];

   @OneToMany(()=>prescriprions,(prescriprion)=>prescriprion.patient_id)
   prescription:prescriprions;

}