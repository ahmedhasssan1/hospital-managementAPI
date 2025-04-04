import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { createDoctorDto } from './dto/createDoc.dto';
import { DocNurse, nurseDto } from './dto/doctorNurse.dto';
import { RolesGuard } from 'src/user/auth/rolesAuth/role.guard';
import { Roles } from 'src/user/auth/rolesAuth/role.descerotaor';
import { USerRole } from 'src/common/enum/Role.enum';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(USerRole.doctor,USerRole.admin)
  @Get('getDoc')
  getDoctor(@Body('name') name:string){
    return this.doctorService.getDoc(name)
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Delete('deleteNurseFromDoc/:id')
  @Roles(USerRole.admin)
  deleteNurse(@Param('id',ParseIntPipe)id:number,@Body() nurse:nurseDto){
    return this.doctorService.deleteNurseFromDocoor(id,nurse)

  }
}
