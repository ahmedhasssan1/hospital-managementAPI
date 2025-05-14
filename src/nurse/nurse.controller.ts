import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { createNurseDto } from './dto/createNurse.dto';
import { updateNurseDto } from './dto/update.dto';

@Controller('nurse')
export class NurseController {
  constructor(private readonly nurseService: NurseService) {}

  @Post('newNurse')
  async createNurse(@Body() nursedto: createNurseDto) {
    return this.nurseService.createNurse(nursedto);
  }
  @Patch(':id')
   updateNurse(@Param('id',ParseIntPipe) id:number ,@Body() updateDto:updateNurseDto){
    return this.nurseService.updateNurse(updateDto,id)

  }
  @Get('allNurses')
  allNurses(){
    console.log('debugging ' );
    return this.nurseService.getAllNurses();
  }
  @Get(':id')
  getNurseInfo(@Param('id',ParseIntPipe)id:number){
    return this.nurseService.findNurse(id);
  }
 

}
