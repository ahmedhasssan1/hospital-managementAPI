import { join } from "path";
import { User } from "src/common/entities/users.entity";
import { Doctor } from "src/doctor/typeOrm/doctor.entity";
import { medicalAppointments } from "src/meddical_appointemts/entity/appointemnt.entity";
import { prescriprions } from "src/prescriptions/entity/prescripttion.entity";
import { Room } from "src/rooms/entity/room.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'patient'})
export class Patient{
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(() => User, user =>user.id ,{ eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @Column()
    name:string;

    @Column()
    contact_info:string

    @ManyToOne(()=>Doctor,(doctor)=>doctor.patients,{onDelete:"SET NULL"})
    @JoinColumn()
    doctor:Doctor



    @ManyToOne(() => Room,(room) => room.id,{onDelete:"SET NULL"})
    @JoinColumn()
    room: Room;

    @OneToMany(() => medicalAppointments, (medicalAppointments) => medicalAppointments.patient_id)
   medicalAppointments: medicalAppointments[];

   @OneToMany(()=>prescriprions,(prescriprion)=>prescriprion.patient_id)
   prescription:prescriprions;

}