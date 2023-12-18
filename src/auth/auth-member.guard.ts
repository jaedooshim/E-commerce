import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRequest } from './auth.interface';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: IRequest): boolean {
    const authorization = request.headers?.authorization;
    if (!authorization || !authorization.includes('Bearer'))
      throw new UnauthorizedException('토큰이 만료되었거나 유효하지않은 토큰입니다.');

    const accessToken = authorization.split(' ')[1];

    const payload = this.jwtService.verify(accessToken);
    request.user = payload;

    return true;
  }
}
