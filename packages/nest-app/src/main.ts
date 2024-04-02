import { bootstrap } from 'uni-nest';
import { AppModule } from './app.module';

// nestjs 入口程序
bootstrap(AppModule, {
  swaggerOptions: {
    title: 'Nestjs Project Template',
    version: '0.0.1',
    license: ['MIT', ''],
    description: 'nestjs 模板项目接口文档',
    contact: ['hacxy', 'hacxy.cn'],
    swaggerPathPrefix: 'docs'
  },
  appOptions: {
    logger: ['error', 'warn', 'debug']
  },
  beforeAppListen: function (app) {
    app.setGlobalPrefix('/weapp');
  }
});
