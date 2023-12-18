import { BadRequestException, Injectable } from '@nestjs/common';
import { MemberService } from '../member/member.service';
import { JwtService } from '../jwt/jwt.service';
import { LoginDto } from './auth.dto';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async login(data: LoginDto): Promise<{ accessToken: string; message: string }> {
    const member = await this.memberService.isValidByEmail(data.email);
    const isValidPassword = await this.bcryptService.compare(data.password, member.password);
    if (!isValidPassword) throw new BadRequestException('패스워드가 일치하지 않습니다.');
    const payload = { id: member.id, email: member.email, name: member.name, nickname: member.nickname };
    const accessToken = this.jwtService.signAccessToken(payload);
    return { accessToken, message: '로그인에 성공했습니다.' };
  }
}
