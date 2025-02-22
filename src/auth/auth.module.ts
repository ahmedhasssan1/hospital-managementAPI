import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './strategy/jwt-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetToken } from './typeorm/resetToken/resetToken';
import { MailService } from './mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResetToken]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, jwtStrategy, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
