import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
// import { filterNull } from '../../utils/transform';
import { deepOmitNil } from 'deeper-lodash';

// 过滤空值，将返回值所有内容遍历递归检查，过滤掉 null、undefined
@Injectable()
export class OmitNilInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data: object) => deepOmitNil(data)));
  }
}
