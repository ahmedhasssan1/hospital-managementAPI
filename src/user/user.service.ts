import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USer } from 'src/common/entities/users.entity';
import { createUSerParam } from './../utils/type';
import { Repository } from 'typeorm';
import { updateDto } from './dto/update.dto';
import * as argon from 'argon2';
@Injectable()
export class userServices {
  constructor(@InjectRepository(USer) private userRepo: Repository<USer>) {}
  async findUsers() {
    return this.userRepo.find();
  }

  async findOne(email: string): Promise<USer | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async createUser(createuser: createUSerParam) {
    const { password, email } = createuser;

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

    return this.userRepo.save(newUser);
  }
  async findOneUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('this user not exist');
    }

    return user;
  }
  async updateUSer(id: number, updateUser: updateDto) {
    return await this.userRepo.update({ id }, { ...updateUser });
  }

  async deleteUser(id: number) {
    return await this.userRepo.delete({ id });
  }
}
