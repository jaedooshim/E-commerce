import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepository } from './member.repository';
import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberService],
})
export class MemberModule {}
