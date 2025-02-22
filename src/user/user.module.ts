import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USer } from 'src/typeorm/entities/users';
import { UserController } from './user.controller';
import { userServices } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([USer])],
  controllers: [UserController],
  providers: [userServices],
  exports: [userServices],
})
export class UserModule {}
