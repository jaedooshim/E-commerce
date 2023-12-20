import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { CreateMemberDto, UpdateMemberDto } from './member.dto';
import { Member, MemberType } from '@prisma/client';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { IMessage } from '../_common/interface/message.interface';

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

  /* 아이디별 회원조회 */
  async findOneById(id: string): Promise<Member> {
    return await this.isValidById(id);
  }

  /* 전체 조회 */
  async findMany(): Promise<Member[]> {
    return await this.memberRepository.findMany();
  }

  /* 회원정보 수정 */
  async update(id: string, data: UpdateMemberDto): Promise<IMessage> {
    await this.isValidById(id);
    await this.existNickname(data.name);
    await this.existTel(data.tel);
    await this.memberRepository.update(id, data);
    return { message: '회원의 정보가 수정되었습니다.' };
  }

  /* 패스워드 수정 */
  async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<IMessage> {
    const member = await this.isValidById(id);
    const PasswordMatch = await this.bcryptService.compare(oldPassword, member.password);
    if (!PasswordMatch) throw new ConflictException('패스워드가 일치하지 않습니다.');

    const hashPassword = await this.bcryptService.hash(newPassword);
    await this.memberRepository.updatePassword(id, hashPassword);
    return { message: '패스워드가 성공적으로 변경되었습니다.' };
  }

  /* 회원삭제 */
  async delete(id: string): Promise<IMessage> {
    await this.isValidById(id);
    await this.memberRepository.softDelete(id);
    return { message: '회원삭제가 완료되었습니다.' };
  }

  /* 회원 탈퇴 */
  async deleteSelf(id: string, password: string): Promise<IMessage> {
    await this.isValidById(id);
    await this.isValidPassword(id, password);
    await this.memberRepository.deleteMember(id);
    return { message: '회원탈퇴가 완료되었습니다.' };
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

  /* 비밀번호 검증 */
  async isValidPassword(id: string, password: string): Promise<void> {
    const member = await this.isValidById(id);
    const passwordValid = await this.bcryptService.compare(password, member.password);
    console.log(password, member.password);
    if (!passwordValid) throw new ConflictException('비밀번호가 일치하지 않습니다.');
  }
}
