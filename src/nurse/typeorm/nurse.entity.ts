import { Exclude } from 'class-transformer';
import { User } from 'src/user/entitiy/users.entity';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'nurse' })
export class Nurse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user_id: User;

  @Column()
  major: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  shift: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.nurses, { onDelete: 'SET NULL' })
  @JoinColumn()
  doctor: Doctor;
}
