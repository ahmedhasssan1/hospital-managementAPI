import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './doctor/doctor.module';
import { PatientsModule } from './patients/patients.module';
import { NurseModule } from './nurse/nurse.module';
import { RoomsModule } from './rooms/rooms.module';
import { MeddicalAppointemtsModule } from './meddical_appointemts/meddical_appointemts.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { Doctor } from './doctor/typeOrm/doctor.entity';
import { AdminModule } from './admin/admin.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { treansformInterceptor } from './common/interceptor/custom.interceptor';

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
      // entities: [User, ResetToken,Doctor],
      // entities: [__dirname + '/../**/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    DoctorModule,
    PatientsModule,
    NurseModule,
    RoomsModule,
    AdminModule,
    MeddicalAppointemtsModule,
    PrescriptionsModule,
    TypeOrmModule.forFeature([Doctor]),
    AdminModule, // Include it here too
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide:APP_INTERCEPTOR,
      useClass:treansformInterceptor
    },
  ],
})
export class AppModule {}
