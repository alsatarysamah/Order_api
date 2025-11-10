import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Hardcoded login for now
  async generateToken(username: string, password: string) {
    if (username === 'admin@test.com' && password === 'admin@1234') {
      const payload = { username };
      const token = this.jwtService.sign(payload, { secret: 'mySecretKey' });
      return { access_token: token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
