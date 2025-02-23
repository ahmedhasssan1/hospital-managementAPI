import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USer } from './typeorm/entities/users';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ResetToken } from './auth/typeorm/resetToken/resetToken';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: '',
      port: ,
      host: '',
      username: '',
      password: '',
      database: '',
      entities: [USer, ResetToken],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
