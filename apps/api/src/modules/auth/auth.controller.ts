import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import type { JwtPayload } from './interfaces/jwt-payload.interface.js';
import { AuthService } from './auth.service.js';
import { UserRole } from '../users/entities/user-role.enum.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @Auth()
  me(@CurrentUser() user: JwtPayload) {
    return user;
  }

  @Get('admin-only')
  @Auth(UserRole.ADMIN)
  adminOnly(@CurrentUser() user: JwtPayload) {
    return { message: 'Admin access confirmed', user };
  }
}
