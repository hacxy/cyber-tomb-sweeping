import { Injectable } from '@nestjs/common';
import { merge } from 'lodash';
// 分页查询服务
@Injectable()
export class PagingService {
  async paging<T>(model, query, args: T) {
    const pageArgs = {
      skip: 0,
      take: 10
    };
    if (query.pageSize) pageArgs.take = Number(query.pageSize || 10);
    if (query.page) pageArgs.skip = (Number(query.page || 1) - 1) * pageArgs.take;

    const finalArgs = merge(args, pageArgs);
    const list: any[] = await model.findMany(finalArgs);
    const total = await model.count({ where: (finalArgs as any).where });
    return {
      list,
      total
    };
  }
}
