import { Body, Controller, Post } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { createNurseDto } from './dto/createNurse.dto';

@Controller('nurse')
export class NurseController {
  constructor(private readonly nurseService: NurseService) {}

  @Post('newNurse')
  async createNurse(@Body() nursedto: createNurseDto) {
    return this.nurseService.createNurse(nursedto);
  }
}
