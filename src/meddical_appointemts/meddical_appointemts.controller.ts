import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MeddicalAppointemtsService } from './meddical_appointemts.service';
import { createAppointementDto } from './dto/create.dto';
import { updateAppointmentDto } from './dto/update.dto';

@Controller('meddical-appointemts')
export class MeddicalAppointemtsController {
  constructor(private readonly meddicalAppointemtsService: MeddicalAppointemtsService) {}
  
  @Post('createAppointment')
  createAppointment(@Body() createAppo:createAppointementDto){
    return this.meddicalAppointemtsService.createAppointement(createAppo);
  }
  @Delete(":id")
  deleteappointment(@Param('id',ParseIntPipe)id:number){
    return this.meddicalAppointemtsService.deleteAppointment(id);
  }
  @Patch('updateAppointment')
  updateAppointment(@Body() updateDto:updateAppointmentDto){
    return this.meddicalAppointemtsService.updateAppointment(updateDto);
  }
  @Get(':id')
  AppoInfo(@Param('id',ParseIntPipe)id:number){
    return this.meddicalAppointemtsService.getAppointment(id);
  }
  
}
