import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

interface Options {
  /**
   * 精准匹配字段
   */
  searchPreciseField?: string[];

  /**
   * 模糊查询字段
   */
  searchFuzzyField?: string[];

  /**
   * 联合模糊查询
   */
  searchString?: string[];

  /**
   * 时间范围查询字段
   */
  searchDateRange?: string;

  /**
   * 字段转 number 类型
   */
  parseNumber?: string[];

  /**
   * 字段转 boolean 类型
   */
  parseBoolean?: string[];
}

// 处理列表查询入参管道
@Injectable()
export class PagingTransformPipe implements PipeTransform {
  options: Options;
  finalQuery: {
    skip: number;
    take: number;
    where: any;
  };
  constructor(options?: Options) {
    this.options = options;
    this.finalQuery = {
      skip: 0,
      take: 10,
      where: {}
    };
  }
  transform(query: any, metadata: ArgumentMetadata) {
    const booleanStr = ['true', 'false', '0', '1'];
    // 处理字段类型转换
    this.options.parseNumber?.map((item) => {
      if (!query[item] || !query[item].length) {
        query[item] = undefined;
      } else {
        query[item] = Number(query[item]);
      }
    });

    this.options.parseBoolean?.map((item) => {
      console.log(booleanStr.includes(query[item]));
      if (!query[item] || !query[item].length || !booleanStr.includes(query[item])) {
        query[item] = undefined;
      } else {
        if (query[item] === 'true' || query[item] === '1') query[item] = true;
        if (query[item] === 'false' || query[item] === '0') query[item] = false;
      }
    });
    // 处理分页
    Object.entries(query).map(([key, value]) => {
      if (key === 'pageSize' && value) this.finalQuery.take = Number(value);
      if (key === 'page') {
        let finalPage = (value as number) || 1;
        finalPage = (Number(finalPage) - 1) * this.finalQuery.take;
        this.finalQuery.skip = finalPage;
      }
      return [key, value];
    });

    // 处理联合查询
    const OR = this.options?.searchString?.map((item) => {
      return {
        [item]: {
          contains: query.searchString
        }
      };
    });
    if (OR && query.searchString) this.finalQuery.where.OR = OR;

    // 处理时间返回查询
    const searchDateRange = this.options?.searchDateRange || 'createdAt';
    this.finalQuery.where[searchDateRange] = {
      gte: query.beginTime ? new Date(query.beginTime) : undefined,
      lte: query.endTime ? new Date(query.endTime) : undefined
    };

    // 处理模糊查询
    this.options?.searchFuzzyField?.map((item) => {
      this.finalQuery.where[item] = {
        contains: query[item]
      };
    });

    // 处理精准查询
    this.options?.searchPreciseField?.map((item) => {
      this.finalQuery.where[item] = query[item];
    });

    return this.finalQuery;
  }
}
