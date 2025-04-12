import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ReceptionistsService } from './receptionists.service';
import { updateRecepcionst } from './dto/update.dto';

@Controller('receptionists')
export class ReceptionistsController {
  constructor(private readonly receptionistsService: ReceptionistsService) {}
  @Patch('updateReceptionst/:id')
  updateReceptionst(@Param('id',ParseIntPipe)id:number,@Body()updteDto:updateRecepcionst){
    return this.receptionistsService.updatereceptionst(updteDto,id);
  }
  @Delete("deleteRecptionssts/:id")
  deleteRece(@Param('id',ParseIntPipe)id:number){
    return this.receptionistsService.deleteReceptioninst(id)
  }
  @Get('allReceptionists')
  getAllReceptionists(){
    return this.receptionistsService.getallReciptionists()
  }
}
