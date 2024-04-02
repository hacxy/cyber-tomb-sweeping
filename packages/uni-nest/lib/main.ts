import { NestFactory } from '@nestjs/core';
import { registerSwaggerModule } from 'lib/swagger/registerSwaggerModule';
import { Bootstrap } from './types';
import { Module } from '@nestjs/common';

export * from './constants';
export * from './decorators';
export * from './exceptions';
export * from './guard';
export * from './interceptor';
export * from './swagger';

export const bootstrap: Bootstrap = async (appModule, options) => {
  @Module({})
  class AppModule extends appModule {}

  // console.log(appModule);
  const { swaggerOptions, appOptions } = options;
  const app = await NestFactory.create(AppModule, appOptions);

  // app listen before
  options.beforeAppListen?.(app);

  // 注册swagger
  registerSwaggerModule(app, swaggerOptions);

  await app.listen(Number(process.env.PORT));
};
