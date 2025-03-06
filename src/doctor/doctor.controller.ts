import { Body, Controller, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { createDoctorDto } from './dto/createDoc.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('newDoc')
  createNewDoctor(@Body() createDoc:createDoctorDto){
    return this.doctorService.createDoctor(createDoc);
  }
}
