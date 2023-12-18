import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MemberModule } from './member/member.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { BcryptModule } from './bcrypt/bcrypt.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, MemberModule, AuthModule, JwtModule, BcryptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
