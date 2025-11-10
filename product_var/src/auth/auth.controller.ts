import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './DTO/login.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @ApiBody({ type: AuthTokenDto })
  @UsePipes(new ValidationPipe())
  async getToken(@Body() body: AuthTokenDto) {
    const { username, password,role } = body;
    return this.authService.generateToken(username, password,role);
  }
}
