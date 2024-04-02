import { Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Method, UniDefine } from 'uni-nest';
import { AuthService } from './auth.service';
import { SilentLoginDto, SilentLoginVo } from './dto/auth.dto';

@Controller('auth')
@ApiTags('用户-授权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UniDefine({
    method: Method.Get,
    path: 'silent',
    summary: '小程序静默授权',
    description:
      '小程序静默授权接口, 入参为小程序调login方法返回的code, 返回token, 小程序客户端若token失效或未保存token则提前调用该接口',
    isPublic: true,
    response: {
      schema: SilentLoginVo
    }
  })
  silentLogin(@Query() query: SilentLoginDto) {
    const { code } = query;
    return this.authService.userSilentLogin(code);
  }

  @UniDefine({
    method: Method.Get,
    summary: '微信手机号授权登录',
    description: '微信用户手机号授权登录, 主动调用'
  })
  phoneNumberLogin(@Query() query: SilentLoginDto) {
    const { code } = query;
    this.authService.userPhoneNumberLogin(code);
    return '待开发';
  }
}
