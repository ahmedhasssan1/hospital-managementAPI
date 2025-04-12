import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { updateAdminDto } from './dto/update.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Patch('updateAdmin')
  updateAdmin(@Body()   updateAdmin:updateAdminDto){
  return this.adminService.updateAdmin(updateAdmin);
  }
  @Get('AllAdmins')
  getAllAdmin(){
      return this.adminService.getAllAdmins();
  }
  @Delete('deleteAdmin/:id')
  DeleteAdmin(@Param('id',ParseIntPipe)id:number){
    return this.adminService.delteAdmin(id)

  }

  
}
