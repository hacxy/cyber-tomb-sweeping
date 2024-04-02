import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { isBooleanString } from 'class-validator';

interface Options {
  [key: string]: 'Boolean' | 'Number' | 'Date';
}

// 处理
@Injectable()
export class QueryTransformPipe implements PipeTransform {
  options: Options;
  constructor(options: Options) {
    this.options = options;
  }
  transform(query: any, metadata: ArgumentMetadata) {
    Object.keys(query).forEach((key) => {
      // 转boolean
      if (this.options[key] === 'Boolean') {
        if (query[key] === '1' || query[key] === 'true') query[key] = true;
        else if (query[key] === '0' || query[key] === 'false') query[key] = false;
        else query[key] = undefined;
      }
      // 转number
      if (this.options[key] === 'Number') {
        query[key] = Number(query[key]);
      }

      // 转Date
      if (this.options[key] === 'Date') {
        query[key] = new Date(query[key]);
      }
    });
    return query;
  }
}
