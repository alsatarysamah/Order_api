import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        const secret: string = configService.get<string>('JWT_SECRET') ?? 'defaultSecret';
        const expiresIn: string = configService.get<string>('JWT_EXPIRES_IN') ?? '1d';

        return {
          secret,
          signOptions: {
            expiresIn,
            algorithm: 'HS256',
            issuer: 'NextGenVC-AuthService',
            audience: 'NextGenVC-API',
          },
        } as JwtModuleOptions;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
