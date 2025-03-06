import { medicalAppointments } from 'src/meddical_appointemts/entity/appointemnt.entity';
import { Nurse } from 'src/nurse/typeorm/nurse.entity';
import { prescriprions } from 'src/prescriptions/entity/prescripttion.entity';
import {
  Column,
  Entity,
  
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'doctor' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Account)
  // user_id: Account;

  @Column()
  name: string;

  @Column()
  major: string;

  // @Column()
  // email:string;

  @Column()
  password: string;

  @OneToMany(() => Nurse, nurse => nurse.doctor)
  nurses: Nurse[];

  @OneToMany(() => medicalAppointments, appointment => appointment.doctor)
  medicalAppointments: medicalAppointments[];

  @OneToMany(() => prescriprions, prescription => prescription.doctor_id)
  prescription: prescriprions[];
}
