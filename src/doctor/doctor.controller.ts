import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { createDoctorDto } from './dto/createDoc.dto';
import { DocNurse } from './dto/doctorNurse.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('newDoc')
  createNewDoctor(@Body() createDoc:createDoctorDto){
    return this.doctorService.createDoctor(createDoc);
  }
  @Post('addNurseToDoc')
  nurseToDoc(@Body()DocNurseDto:DocNurse){
    return  this.doctorService.addNurseToDoc(DocNurseDto)
  }

  @Get('getDoc')
  getDoctor(@Body('name') name:string){
    return this.doctorService.getDoc(name)
  }
}
