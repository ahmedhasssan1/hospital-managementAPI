import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userServices } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { authPayload } from './dto/create-auth.dto';
import { changePass } from './dto/change-pass';
import { ResetToken } from './typeorm/resetToken/resetToken';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ResetToken) private resetRepo: Repository<ResetToken>,
    private userservice: userServices,
    private jwtservice: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userservice.findOne(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.password) {
      console.error('Error: User has no password stored in DB!', user);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const { password: _, ...res } = user;
    return res;
  }

  async login(authPayload: authPayload) {
    const { password, email } = authPayload;

    const user1 = await this.userservice.findOne(email);
    if (!user1) {
      throw new UnauthorizedException('Invalid user');
    }
    //debug
    console.log('Stored Hashed Password:', user1.password);
    console.log('Entered Password:', password);

    if (!user1.password) {
      console.error('Error: User has no password stored in DB!', user1);
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await argon.verify(user1.password, password);
    if (!valid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user1.email, sub: user1.id };
    return {
      accessToken: this.jwtservice.sign(payload),
    };
  }
  async changePassword(user, changePass1: changePass) {
    const { password, newPassword } = changePass1;
    const userExist = await this.userservice.findOneUser(user.userId);
    console.log(user.userId);
    console.log('user exist ', userExist);
    if (!userExist) {
      throw new UnauthorizedException('this user no longer exist');
    }
    const valid = await argon.verify(userExist.password, password);

    if (!valid) {
      throw new UnauthorizedException(' Invalid password ');
    }
    const hashPassword = await argon.hash(newPassword);
    console.log(' old pass:  ', userExist.password);
    console.log(' newPassword : ', hashPassword);
    await this.userservice.updateUSer(user.userId, {
      password: hashPassword,
    });
    return 'password changed successfully';
  }
  async forgotPassword(email: string) {
    const emailExist = await this.userservice.findOne(email);
    console.log('email exist', emailExist);
    if (emailExist) {
      const expdate = new Date();
      expdate.setHours(expdate.getHours() + 1);
      const resetToken = uuidv4();
      console.log(resetToken);
      const tokenForReset = this.resetRepo.create({
        token: resetToken,
        expireDAte: expdate,
        id: emailExist.id,
        createAt: new Date(),
      });
      if (!tokenForReset) {
        throw new UnauthorizedException(' no restet token saved in da');
      }
      await this.resetRepo.save(tokenForReset);
      console.log('reset token :', tokenForReset);
      await this.mailService.sendPasswordResetEmail(email, resetToken);
    }
    return { message: 'if email is exist ,it will recieve message' };
  }
  async resetPassword(newPassword: string, resetToken: string) {
    const tokenExist = await this.resetRepo.findOne({
      where: {
        token: resetToken,
        expireDAte: MoreThanOrEqual(new Date()),
      },
    });
    if (!tokenExist) {
      throw new UnauthorizedException('the token in invalid');
    }
    const findUser = await this.userservice.findOneUser(tokenExist.id);
    if (!findUser) {
      throw new UnauthorizedException('the user no more avalible');
    }
    const newHashPass = await argon.hash(newPassword);

    console.log(newHashPass);
    await this.userservice.updateUSer(findUser.id, { password: newHashPass });
  }
}
