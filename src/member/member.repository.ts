import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto, UpdateMemberDto } from './member.dto';
import { Member, MemberType, Prisma } from '@prisma/client';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}
  private memberRepository = this.prisma.member;

  /* 회원가입 */
  async create(data: CreateMemberDto, type: MemberType): Promise<Member> {
    return this.memberRepository.create({ data: { ...data, type } });
  }

  /* 회원정보 수정 */
  async update(id: string, data: UpdateMemberDto): Promise<Member> {
    return this.memberRepository.update({ where: { id }, data });
  }

  /* 패스워드 수정 */
  async updatePassword(id: string, newPassword: string) {
    const member = await this.findById(id);
    member.password = newPassword;
    await this.memberRepository.update({ where: { id }, data: { password: newPassword } });
  }

  /* 회원삭제 */
  async softDelete(id: string): Promise<Member> {
    return this.memberRepository.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  /* 이름 찾기 */
  async findByName(name: string): Promise<Member | null> {
    return this.memberRepository.findFirst({ where: { name, deletedAt: null } });
  }

  /* 닉네임 찾기 */
  async findByNickname(nickname: string): Promise<Member | null> {
    return this.memberRepository.findFirst({ where: { nickname, deletedAt: null } });
  }

  /* 이메일 찾기 */
  async findByEmail(email: string): Promise<Member | null> {
    return this.memberRepository.findFirst({ where: { email, deletedAt: null } });
  }

  /* 전화번호 찾기 */
  async findByTel(tel: string): Promise<Member | null> {
    return this.memberRepository.findFirst({ where: { tel, deletedAt: null } });
  }

  /* ID 찾기 */
  async findById(id: string): Promise<Member | null> {
    return this.memberRepository.findFirst({ where: { id, deletedAt: null } });
  }

  /* 전체 찾기 */
  async findMany(): Promise<Member[]> {
    return this.memberRepository.findMany({ where: { deletedAt: null } });
  }
}
