import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post('addPresc')
  createPresc(@Body()createDto:createDto){
    return this.prescriptionsService.createPrescription(createDto);
  }
  @Get(':id')
  getPatientPresc(@Param('id',ParseIntPipe)id:number){
    return this.prescriptionsService.getPatientPresc(id);
  }
  @Patch('updatePresc/:id')
  updatePresc(@Body()updatedto:updateDto,
  @Param('id',ParseIntPipe)id:number){
    return this.prescriptionsService.updatePresc(updatedto,id)
  }
  @Delete(':id')
  deletePresc(@Param('id',ParseIntPipe)id:number){
    return this.prescriptionsService.deletePresc(id);
  }
}
