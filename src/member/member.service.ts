import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { CreateMemberDto } from './member.dto';
import { Member, MemberType } from '@prisma/client';
import { BcryptService } from '../bcrypt/bcrypt.service';

export interface IMessage {
  message: string;
}
@Injectable()
export class MemberService {
  constructor(
    private memberRepository: MemberRepository,
    private bcryptService: BcryptService,
  ) {}

  /* 일반 회원가입 */
  async create(data: CreateMemberDto): Promise<IMessage> {
    await this.existNickname(data.nickname);
    await this.existEmail(data.email);
    await this.existTel(data.tel);
    data.password = await this.bcryptService.hash(data.password);
    await this.memberRepository.create(data, MemberType.Basic);
    return { message: '회원가입이 완료되었습니다.' };
  }

  /* 닉네임 중복검증 */
  async existNickname(nickname: string): Promise<void> {
    const member = await this.memberRepository.findByNickname(nickname);
    if (member) throw new ConflictException('이미 등록된 닉네임입니다.');
  }

  /* 이메일 중복검증 */
  async existEmail(email: string): Promise<void> {
    const member = await this.memberRepository.findByEmail(email);
    if (member) throw new ConflictException('이미 등록된 이메일입니다.');
  }

  /* 전화번호 중복검증 */
  async existTel(tel: string): Promise<void> {
    const member = await this.memberRepository.findByTel(tel);
    if (member) throw new ConflictException('이미 등록된 전화번호입니다.');
  }

  /* 이메일 유효검증 */
  async isValidByEmail(email: string): Promise<Member> {
    const member = await this.memberRepository.findByEmail(email);
    if (!member) throw new NotFoundException('해당하는 이메일이 존재하지 않습니다.');
    return member;
  }

  /* 멤버 유효검증 */
  async isValidById(id: string): Promise<Member> {
    const member = await this.memberRepository.findById(id);
    if (!member) throw new NotFoundException('해당하는 회원은 존재하지 않습니다.');
    return member;
  }
}
