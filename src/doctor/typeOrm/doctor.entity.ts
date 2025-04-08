import { Exclude } from 'class-transformer';
import { User } from 'src/user/entitiy/users.entity';
import { Nurse } from 'src/nurse/typeorm/nurse.entity';
import { Patient } from 'src/patients/typeOrm/patient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'doctor' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn() // Maps the foreign key column
  user_id: User;

  @Column()
  name: string;

  @Column()
  major: string;

  @OneToMany(() => Patient, (patient) => patient.doctor)
  patients: Patient[];

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Nurse, (nurse) => nurse.doctor)
  nurses: Nurse[];


}
