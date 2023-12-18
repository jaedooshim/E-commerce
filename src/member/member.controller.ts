import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IMessage, MemberService } from './member.service';
import { CreateMemberDto } from './member.dto';

@Controller('member')
@ApiTags('member')
export class MemberController {
  constructor(private memberservice: MemberService) {}

  /* 회원가입 */
  @Post()
  async create(@Body() data: CreateMemberDto): Promise<IMessage> {
    return await this.memberservice.create(data);
  }
}
