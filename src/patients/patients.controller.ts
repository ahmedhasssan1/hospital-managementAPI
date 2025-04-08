import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { addDoc } from './dto/addDoc.dto';
import { RoomPatientDto } from './dto/roomPatient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}
  @Get(':id')
  findPatient(@Param('id',ParseIntPipe)id:number){
    return this.patientsService.findPatient(id)
  }
  @Patch(':id')
  removeDocFromPatient(@Param('id',ParseIntPipe)id:number){
    return this.patientsService.removeDoctorFromPatient(id);
  }
  @Post('addDocToPatient/:id')
  addDoc(@Param('id',ParseIntPipe)id:number,@Body()docDto:addDoc){
    return this.patientsService.addDoctor(docDto,id)
  }
  @Post("addRoomToPatient")
  addRoom(@Body()RoomPatient:RoomPatientDto){
    return this.patientsService.addRoomToPatient(RoomPatient);
  }
}
