import { MemberDto } from '@/modules/member/dto/index.dto';
import { MemberVo } from '@/modules/member/vo/index.vo';
import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Method, UniDefine, User } from 'uni-nest';
import { MemberService } from './member.service';

@ApiTags('用户')
@Controller('user')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @UniDefine({
    method: Method.Get,
    summary: '获取用户信息',
    response: {
      schema: MemberVo
    }
  })
  async getUserInfo(@User() user) {
    return this.memberService.getUserInfo(user);
  }

  @UniDefine({
    method: Method.Patch,
    summary: '更新用户信息'
  })
  async updateUserInfo(@User() user, @Body() userInfo: MemberDto) {
    const { openId } = user;
    return this.memberService.updateUserInfo(openId, userInfo);
  }
}
