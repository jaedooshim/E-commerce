import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() data: LoginDto): Promise<{ accessToken: string; message: string }> {
    return await this.authService.login(data);
  }
}
