import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { transformDateTime } from '@/utils/transform';

// 时间格式化拦截器，对返回的UTC时间格式化成北京时间 YYYY-MM-DD HH:mm:ss 格式
@Injectable()
export class FormatDateTimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data: object) => transformDateTime(data)));
  }
}
