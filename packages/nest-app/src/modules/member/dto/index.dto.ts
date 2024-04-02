export class CreateMemberDto {
  username?: string;
  openId: string;
}

export class MemberDto {
  /**
   * 用户名称
   */
  username?: string;

  /**
   * 手机号
   */
  mobile?: string;

  /**
   * 用户头像
   */
  headImg?: string;
}
