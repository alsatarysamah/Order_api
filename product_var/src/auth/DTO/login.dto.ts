import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
  @ApiProperty({
    description: 'User email for authentication',
    example: 'admin@test.com',
  })
  @IsEmail({}, { message: 'Username must be a valid email' })
  username: string;

  @ApiProperty({
    description: 'User password',
    example: 'admin@1234',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

    @ApiProperty({
    description: 'User role',
    example: 'admin',
    enum: ['admin', 'user'],
  })
  @IsString()
  @IsIn(['admin', 'user'], { message: 'Role must be either admin or user' })
  role: 'admin' | 'user';
}
