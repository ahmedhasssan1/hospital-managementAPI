import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USer } from './common/entities/users.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ResetToken } from './user/auth/typeorm/resetToken/resetToken';
import { DoctorModule } from './doctor/doctor.module';
import { PatientsModule } from './patients/patients.module';
import { NurseModule } from './nurse/nurse.module';
import { RoomsModule } from './rooms/rooms.module';
import { MeddicalAppointemtsModule } from './meddical_appointemts/meddical_appointemts.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 4000,
      host: 'localhost',
      username: 'postgres',
      database: process.env.DATABASE,
      password: process.env.DATABASE_PASSWORD,
      entities: [USer, ResetToken],
      synchronize: true,
    }),
    DoctorModule,
    PatientsModule,
    NurseModule,
    RoomsModule,
    MeddicalAppointemtsModule,
    PrescriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
