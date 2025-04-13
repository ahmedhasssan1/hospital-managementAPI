import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entitiy/users.entity';
import { createUserParam } from './../utils/type';
import { Repository } from 'typeorm';
import { updateDto } from './dto/update.dto';
import * as argon from 'argon2';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';
import { Nurse } from 'src/nurse/typeorm/nurse.entity';
import { Patient } from 'src/patients/typeOrm/patient.entity';
import { Room } from 'src/rooms/entity/room.entity';
import { Admin } from 'src/admin/entity/admin.entity';
import { receptionist } from 'src/receptionists/entity/receptionist.entity';

@Injectable()
export class userServices {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Nurse) private nurseRepo: Repository<Nurse>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Room) private RoomRepo: Repository<Room>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(receptionist) private receptionRepo: Repository<receptionist>,
  ) {}

  async findUsers() {
    const findAllUsers=await this.userRepo.find();
    if(!findAllUsers){
      throw new NotFoundException("no users exist");
    }
    return findAllUsers;
  }

  async findOne(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async createUser(createuser: createUserParam) {
    const {
      password,
      email,
      role,
      name,
      roomID,
      major,
      shift,
      contact_info,
      doctorID,
    } = createuser;

    if (role === 'patient') {
      return this.createPatient(name, contact_info, roomID, doctorID);
    }
    if(email && !password){
      throw new BadRequestException('password must be provided to this email')
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
      if (!major || !email ) {
        throw new BadRequestException('Major or email  is required for nurses');
      }
      return this.createDoctor(name, major, hashpassword, newUser);
    }
    if (role === 'nurse') {
      if (!major || !email) {
        throw new BadRequestException('Major or email  is required for nurses');
      }
      return this.createNurse(email, name, major, hashpassword, newUser, shift);
    }
    if (role === 'admin') {
      if (!email) {
        throw new BadRequestException('Email is required for admin users');
      }
      return this.CreateAdmin(name, email, hashpassword, newUser);
    }
    if(role==='receptionist'){
      if(!name || !email){
        throw new BadRequestException('This receptionist must have a valid name and email');
      }
      return this.CrerateReceptionst(name, email, hashpassword, newUser,shift);
    }

    return saveUSer;
  }

  private async createPatient(
    name: string,
    contact_info: string,
    roomID?: number,
    doctorID?: number,
  ) {
    if (!name || !contact_info) {
      throw new BadRequestException(
        'Name and contact info are required for patients',
      );
    }

    let room: Room | null = null;
    if (roomID) {
      room = await this.RoomRepo.findOne({ where: { id: roomID } });
      if (!room) throw new BadRequestException('Room not found');
      if (!room.available)
        throw new BadRequestException('This room is unavailable');

      room.available = false;
      await this.RoomRepo.save(room);
    }

    if (!doctorID) throw new BadRequestException('Doctor ID is required');
    const doctor = await this.doctorRepo.findOne({ where: { id: doctorID } });
    if (!doctor) throw new BadRequestException('Doctor not found');

    // Create a User entry for the patient (without email/password)
    const patientUser = this.userRepo.create({
      name,
      role: 'patient',
      createAt: new Date(),
    });

    const savedPatientUser = await this.userRepo.save(patientUser);

    const patient = this.patientRepo.create({
      name,
      contact_info,
      user: savedPatientUser, // Link to User entity
      doctor,
      room: room || undefined,
    });

    return this.patientRepo.save(patient);
  }

  private async createDoctor(
    name: string,
    major: string,
    password: string,
    user: User,
  ) {
    const doctor = this.doctorRepo.create({
      name,
      major: major, // Assuming major is part of createUserParam
      password: password,
      user_id: user, // Pass the saved User entity
    });
    await this.doctorRepo.save(doctor);
    return doctor;
  }
  private async createNurse(
    email: string,
    name: string,
    major: string,
    password: string,
    user: User,
    shift: string,
  ) {
    const nurse = this.nurseRepo.create({
      email,
      name,
      major,
      password,
      user_id: user,
      shift: shift,
    });
    console.log('debugging ', nurse);

    await this.nurseRepo.save(nurse);
    return nurse;
  }
  private async CreateAdmin(
    name: string,
    email: string,
    password: string,
    user:User,
  ): Promise<Admin> {
    const admin = this.adminRepo.create({
      name,
      email,
      password,
      user,
    });
    await this.adminRepo.save(admin);
    return admin;
  }
  private async CrerateReceptionst(
    name: string,
    email: string,
    password: string,
    user: User,
    shift:string
  ): Promise<receptionist> {
    const receptionist = this.receptionRepo.create({
      name,
      email,
      password,
      user,
      shift,
    });
    await this.receptionRepo.save(receptionist);
    return receptionist;
  }
  async findOneUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('this user not exist');
    }

    return user;
  }
  async updateUser(id: number, updateUser: updateDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('this user not exist');
    }

    await this.userRepo.update({ id }, { ...updateUser });
    return this.userRepo.findOne({ where: { id } });
  }

  async deleteUser(id: number) {
    return await this.userRepo.delete({ id });
  }
}
