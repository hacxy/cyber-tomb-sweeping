import { Controller, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Method, UniDefine } from 'uni-nest';
import { UploadService } from './upload.service';

@Controller('upload')
@ApiTags('文件上传')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UniDefine({
    method: Method.Post,
    path: 'file',
    summary: '上传单个文件',
    body: {
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    },
    response: {
      type: 'string'
    }
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.create(file);
  }

  @UniDefine({
    method: Method.Post,
    summary: '上传多个文件',
    path: 'files',
    body: {
      schema: {
        type: 'object',
        properties: {
          files: {
            type: 'array', // 👈  array of files
            items: {
              type: 'string',
              format: 'binary'
            }
          }
        }
      }
    },
    response: {
      type: 'string'
    }
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  uploads(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return '';
  }

  @UniDefine({
    method: Method.Post,
    path: 'fields',
    summary: '按字段上传文件',
    body: {
      schema: {
        type: 'object',
        properties: {
          // 👈  field names need to be repeated for swagger
          avatar: {
            type: 'string',
            format: 'binary'
          },
          background: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    }
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      // 👈  multiple files with different field names
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 }
    ])
  )
  @ApiConsumes('multipart/form-data')
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  }
}
