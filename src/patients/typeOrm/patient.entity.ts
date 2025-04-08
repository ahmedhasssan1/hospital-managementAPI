import { User } from 'src/user/entitiy/users.entity';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';
import { medicalAppointments } from 'src/meddical_appointemts/entity/appointemnt.entity';
import { prescriptions } from 'src/prescriptions/entity/prescripttion.entity';
import { Room } from 'src/rooms/entity/room.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'patient' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  name: string;

  @Column()
  contact_info: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.patients, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  doctor: Doctor | null; //docotor_id=docotor.id

  @ManyToOne(() => Room, (room) => room.id, { onDelete: 'SET NULL' })
  @JoinColumn()
  room: Room;

  @OneToMany(
    () => medicalAppointments,
    (medicalAppointments) => medicalAppointments.patient_id,
    { onDelete: 'CASCADE' },
  )
  medicalAppointments: medicalAppointments[];

  @OneToMany(() => prescriptions, (prescriprion) => prescriprion.patient, {
    onDelete: 'CASCADE',
  })
  prescription: prescriptions;
}
