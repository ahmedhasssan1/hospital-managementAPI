import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local-guard';
import { jwtauthGuard } from './strategy/jwt-authguard';
import { authPayload } from './dto/create-auth.dto';
import { changePass } from './dto/change-pass';
import { emailDto } from './dto/emailCheck';
import { ResetPass } from './dto/resetPassword-dto';
import { User } from 'src/common/entities/users.entity';
import { Roles } from './rolesAuth/role.descerotaor';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() authPayload: authPayload) {
    return this.authService.login(authPayload);
  }
  @UseGuards(jwtauthGuard)
  @Post('Profile')
  jwtAuth(@Request() req): User {
    return req.user;
  }

  @UseGuards(jwtauthGuard)
  @Post('changePassword')
  changePassword(@Request() req, @Body() changePass: changePass) {
    const { password, newPassword } = changePass;
    return this.authService.changePassword(req.user, {
      password,
      newPassword,
    });
  }

  @Post('forget-password')
  forgotPassword(@Body() forgotEmailDto: emailDto) {
    return this.authService.forgotPassword(forgotEmailDto.email);
  }

  @Post('reset-password')
  resetPasswor(@Body() resetPass: ResetPass) {
    return this.authService.resetPassword(
      resetPass.newPassword,
      resetPass.resetToken,
    );
  }
}
