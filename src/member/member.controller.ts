import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IMessage, MemberService } from './member.service';
import { CreateMemberDto, UpdateMemberDto } from './member.dto';
import { Member } from '@prisma/client';
import { ParamIdDto } from '../_common/dtos/request.dto';
import { Auth } from '../auth/auth.decorator';
import { IPayload } from '../jwt/jwt.interface';
import { AuthUserGuard } from '../auth/auth-member.guard';

@Controller('member')
@ApiTags('member')
export class MemberController {
  constructor(private memberservice: MemberService) {}

  /* 회원가입 */
  @Post()
  async create(@Body() data: CreateMemberDto): Promise<IMessage> {
    return await this.memberservice.create(data);
  }

  /* 아이디별 회원조회 */
  @Get(':id')
  async findOneById(@Param() params: ParamIdDto): Promise<Member> {
    return await this.memberservice.findOneById(params.id);
  }

  /* 전체 조회 */
  @Get()
  async findMany(): Promise<Member[]> {
    return await this.memberservice.findMany();
  }

  /* 회원정보 수정 */
  @Put(':id')
  async update(@Param() params: ParamIdDto, @Body() update: UpdateMemberDto): Promise<IMessage> {
    return await this.memberservice.update(params.id, update);
  }

  /* 패스워드 수정 */
  @Put('password')
  @UseGuards(AuthUserGuard)
  async updatePassword(
    @Auth() user: IPayload,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ): Promise<IMessage> {
    return await this.memberservice.updatePassword(user.id, oldPassword, newPassword);
  }

  /* 회원삭제 */
  @Delete(':id')
  async delete(@Param() params: ParamIdDto): Promise<IMessage> {
    return await this.memberservice.delete(params.id);
  }
}
