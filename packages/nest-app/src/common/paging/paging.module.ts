import { Global, Module } from '@nestjs/common';
import { PagingService } from './paging.service';

// 作为全局模块导出
@Global()
@Module({
  providers: [PagingService],
  exports: [PagingService]
})
export class PagingModule {}
