import { BusinessException } from '@/common/exceptions/business.exceptions';
import { MemberService } from '@/modules/member/member.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly memberService: MemberService
  ) {}
  /**
   *
   * @param code 小程序login api拿到的code
   * @returns
   */
  async userSilentLogin(code: string) {
    const appid = this.configService.get('APP_ID');
    const secret = this.configService.get('SECRET');
    const jwtSignOption = {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('TOKEN_EXPIRES')
    };

    // 获取微信用户openID
    const openId = await this.httpService.axiosRef
      .get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
          appid,
          secret,
          js_code: code,
          grant_type: 'authorization_code'
        }
      })
      .then((res) => {
        return res.data.openid;
      });
    if (!openId) BusinessException.throwCommonError();

    let userInfo = await this.memberService.getUserInfo({ openId });

    // 如果找不到用户则创建一个新的用户
    if (!userInfo) {
      userInfo = await this.memberService.createUser({ openId, username: '微信用户' });
    }

    const token = this.jwtService.sign(
      {
        id: userInfo.id,
        username: userInfo.username,
        openId: userInfo.openId
      },
      jwtSignOption
    );

    return { token };
  }

  /**
   * 手机号授权登录
   * @param code
   * @returns
   */
  async userPhoneNumberLogin(code: string) {
    console.log(code);
    return '暂不支持';
  }
}
