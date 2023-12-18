import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { IPayload } from './jwt.interface';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  signAccessToken(payload: IPayload): string {
    return sign(payload, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!, { expiresIn: '1d' });
  }

  verify(accessToken: string): IPayload {
    try {
      return verify(accessToken, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!) as IPayload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
