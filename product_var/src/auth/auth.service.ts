import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // Hardcoded login for now
  async generateToken(username: string, password: string, role: string) {
    if (username === 'admin@test.com' && password === 'admin@1234') {
      const payload = { username, role };
      const token = this.jwtService.sign(payload, {
        secret: this.config.get<string>('JWT_SECRET'),
      });
      return { access_token: token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
