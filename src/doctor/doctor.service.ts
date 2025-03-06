import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './typeOrm/doctor.entity';
import { Repository } from 'typeorm';
// import { createDoctorDto } from './dto/createDoc.dto';
import * as argon from 'argon2';
import { createDoctorParam } from './dto/savedIndata';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
  ) {}

  async createDoctor(createDoc: createDoctorParam) {
    const { password } = createDoc;
    // const repeatedEmail=await this.doctorRepo.findOne({email:email})
    // if (email){
    //   throw new UnauthorizedException();
    // }
    const hashPassword = await argon.hash(password);
    const newDoc = this.doctorRepo.create({
        ...createDoc,
        password: hashPassword,
    });
    console.log('debugging ', password);
    console.log('debugging ', newDoc);

    return this.doctorRepo.save(newDoc);
  }
}
