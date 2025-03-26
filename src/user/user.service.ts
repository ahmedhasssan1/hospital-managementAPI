import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/users.entity';
import { createUserParam } from './../utils/type';
import { Repository } from 'typeorm';
import { updateDto } from './dto/update.dto';
import * as argon from 'argon2';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';
import { Nurse } from 'src/nurse/typeorm/nurse.entity';
import { Patient } from 'src/patients/typeOrm/patient.entity';
import { Room } from 'src/rooms/entity/room.entity';

@Injectable()
export class userServices {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Nurse) private nurseRepo: Repository<Nurse>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Room) private RoomRepo: Repository<Room>,
  ) {}

  async findUsers() {
    return this.userRepo.find();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async createUser(createuser: createUserParam) {
    
   
    const { password, email, role, name,roomID , major, shift,contact_info,doctorID } = createuser;
      console.log('debugging roomid ',roomID);
      
    if (role === 'patient') {
      if(!name || !contact_info){
        throw new BadRequestException('require named and contact_info of the patient');
      }
      let room:Room | null=null ;
      if(roomID){
        room=await this.RoomRepo.findOne( {where:{id:roomID} } )
        
        if(!room){
          throw new BadRequestException('Room not found');
          
        }
      }
      console.log('debugging ',room);


     let findDoctor: Doctor | undefined = undefined;
    if (doctorID) {
      findDoctor = await this.doctorRepo.findOne({ where: { id: doctorID } }) ??undefined;
      if (!findDoctor) {
        throw new BadRequestException('Doctor not found');
      }
    } else {
      throw new BadRequestException('Doctor ID is required');
    }

      
    
      const newuser=this.userRepo.create({
        name,
        contact_info,
        role
      })
      const savedUser=await this.userRepo.save(newuser);
      const patient= this.patientRepo.create({
        name,
        contact_info,
        user:savedUser,
        doctor:findDoctor,
        room:room || undefined
      })
      await this.patientRepo.save(patient);
      return patient
    }


    const reaptedEmail = await this.userRepo.findOne({
      where: { email: email },
    });
    if (reaptedEmail) {
      throw new BadRequestException('this user already exist ');
    }
    const hashpassword = await argon.hash(password);
    console.log('hashed : ', hashpassword);
    


    const newUser = this.userRepo.create({
      ...createuser,
      password: hashpassword,
      createAt: new Date(),
    });

    const saveUSer = await this.userRepo.save(newUser);


    if (role === 'doctor') {
      const doctor = this.doctorRepo.create({
        name: name,
        major: major, // Assuming major is part of createUserParam
        password: hashpassword,
        user_id: saveUSer, // Pass the saved User entity
      });
      await this.doctorRepo.save(doctor);
    }
    if (createuser.role === 'nurse') {
      const nurse = this.nurseRepo.create({
        email: createuser.email,
        name: createuser.name,
        major: createuser.major,
        password: hashpassword,
        user_id: saveUSer,
        shift: shift,
      });  
      await this.nurseRepo.save(nurse);
    }


  

    return saveUSer;
  }
  async findOneUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('this user not exist');
    }

    return user;
  }
  async updateUser(id: number, updateUser: updateDto) {
    return await this.userRepo.update({ id }, { ...updateUser });
  }

  async deleteUser(id: number) {
    return await this.userRepo.delete({ id });
  }
}
