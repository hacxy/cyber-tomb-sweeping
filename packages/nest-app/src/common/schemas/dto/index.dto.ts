import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

// 列表查询用户入参
export class PagingDto {
  @ApiProperty({ description: '页码', example: 1 })
  @IsNumberString()
  pageNum?: number;

  @ApiProperty({ description: '每页展示数据条数', example: 10 })
  @IsNumberString()
  pageSize?: number;

  @ApiProperty({ description: '查询条件' })
  @IsString()
  searchString?: string;

  @ApiProperty({ description: '开始时间' })
  @IsString()
  beginTime?: string;

  @ApiProperty({ description: '结束时间' })
  @IsString()
  endTime?: string;
}
