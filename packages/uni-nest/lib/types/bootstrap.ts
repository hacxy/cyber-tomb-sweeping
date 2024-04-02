import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { SwaggerOptions } from '../swagger';

export interface Options {
  /**
   * @summary swagger文档配置选项
   */
  swaggerOptions?: SwaggerOptions;

  /**
   * @summary 创建app配置选项
   */
  appOptions?: NestApplicationOptions;
}

export type Bootstrap = (
  module: any,
  options: Options & {
    beforeAppListen?: (app: INestApplication<any>) => void;
  }
) => Promise<void>;
