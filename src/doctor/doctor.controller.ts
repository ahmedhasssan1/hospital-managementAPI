import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { createDoctorDto } from './dto/createDoc.dto';
import { DocNurse, nurseDto } from './dto/doctorNurse.dto';

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
  @Delete('deleteNurseFromDoc/:id')
  deleteNurse(@Param('id',ParseIntPipe)id:number,@Body() nurse:nurseDto){
    return this.doctorService.deleteNurseFromDocoor(id,nurse)

  }
}
