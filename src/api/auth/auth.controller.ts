import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/application/auth/auth.service';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
} from 'src/application/auth/guards';
import { AuthDto } from 'src/domain/dtos/auth';

const routBase = 'auth';

@ApiTags(routBase)
@Controller(routBase)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  // @UseGuards(RefreshTokenGuard)
  // @ApiBearerAuth('JWT-auth')
  // @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // async refreshToken(@Req() req: Request): Promise<any> {
  //   const user = req['user'];
  //   return await this.authService.refreshToken(user['refreshToken']);
  // }
}
