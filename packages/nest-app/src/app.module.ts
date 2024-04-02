import { PrismaModule } from '@/common/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard, UniBaseExceptionsFilter, UniHttpExeptionsFilter, UniResponseInterceptor } from 'uni-nest';
import { AuthModule } from './modules/auth/auth.module';
import { MemberModule } from './modules/member/member.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 加载环境变量
    AuthModule,
    PrismaModule,
    MemberModule,
    UploadModule
  ],
  controllers: [],
  providers: [
    // jwt 校验守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    // 统一响应格式
    {
      provide: APP_INTERCEPTOR,
      useValue: new UniResponseInterceptor()
    },
    // role 权限校验守卫。
    // 注意： 该守卫依赖jwt校验通过的用户数据，所以注册顺序不可颠倒。
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // 校验参数抛出业务异常管道
    // {
    //   provide: APP_PIPE,
    //   useClass: BusinessValidationPipe,
    // },
    // 入参过滤不需要的字段
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({ whitelist: true, transform: true }),
    // },
    // 注册时间格式转换拦截器
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: FormatDateTimeInterceptor,
    // },
    // 注册过滤空值拦截器
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: OmitNilInterceptor,
    // },

    // 注册基本错误过滤器
    {
      provide: APP_FILTER,
      useClass: UniBaseExceptionsFilter
    },
    // 注册http错误过滤器
    {
      provide: APP_FILTER,
      useClass: UniHttpExeptionsFilter
    }
  ]
})
export class AppModule {}
