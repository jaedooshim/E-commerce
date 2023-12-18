import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MemberModule } from '../member/member.module';
import { JwtModule } from '../jwt/jwt.module';
import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
  imports: [MemberModule, JwtModule, BcryptModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
