import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './entity/bills.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bills])],
  controllers: [BillsController],
  providers: [BillsService],
  
})
export class BillsModule {}
