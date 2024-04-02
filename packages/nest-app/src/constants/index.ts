/**
 * 资源类型
 */
export enum ResourceType {
  /**
   * 菜单
   */
  Menu = 1,
  /**
   * 操作
   */
  Action = 2
}

/**
 * 请求方法
 */
export enum ResourceRequestMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export const BUSINESS_HTTP_CODE = 'HttpCode';
export const IS_PUBLIC_KEY = 'isPublic';
export const IS_ALLOW_NO_PERM = 'isAllowNoPerm';
