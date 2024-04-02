import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateMemberDto, MemberDto } from '@/modules/member/dto/index.dto';
import { MemberVo } from '@/modules/member/vo/index.vo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
  constructor(private readonly prismaService: PrismaService) {}
  /**
   * 获取用户信息
   * @param user
   * @returns
   */
  async getUserInfo(user): Promise<MemberVo> {
    return await this.prismaService.member.findUnique({
      where: { openId: user.openId }
    });
  }

  /**
   * 创建新用户
   * @param data
   * @returns
   */
  async createUser(data: CreateMemberDto) {
    return await this.prismaService.member.create({ data });
  }

  /**
   * 更新用户信息
   * @param openId
   * @param data
   * @returns
   */
  async updateUserInfo(openId: string, data: MemberDto) {
    return await this.prismaService.member.update({
      where: {
        openId
      },
      data
    });
  }
}
