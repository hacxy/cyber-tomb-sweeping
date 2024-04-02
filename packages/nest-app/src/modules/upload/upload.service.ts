import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as COS from 'cos-nodejs-sdk-v5';

@Injectable()
export class UploadService {
  private readonly cos: COS = new COS({
    SecretId: process.env.COS_SECRET_ID, // 密钥Id
    SecretKey: process.env.COS_SECRET_KEY // 密钥Key
  });
  private readonly bucket: string = 'loclink-1259720482';
  private readonly region: string = 'ap-beijing';
  private readonly baseParams: COS.PutObjectParams = {
    Bucket: this.bucket, // 桶名称
    Region: this.region, // 桶的所属地域
    Body: undefined, // 上传的文件二进制流
    Key: '' // 文件在桶中的存储path，以及存储名称
  };

  async create(file) {
    const params = Object.assign(this.baseParams, {
      Body: file.buffer,
      Key: `/image/${Date.now()}-${file.originalname}`
    });
    try {
      // 视频上传
      if (file.mimetype.includes('video')) {
        params.Key = '/video/' + Date.now() + '-' + file.originalname;
      }
      // 音频上传
      if (file.mimetype.includes('audio')) {
        params.Key = '/audio/' + Date.now() + '-' + file.originalname;
      }
      // const res = await this.cos.putObject(params);
      const res = await this.cos.uploadFiles({
        files: [{ ...params, FilePath: '' }]
      });
      return res.files;
    } catch (error) {
      await this.remove(params.Key);
      throw new HttpException('文件上传失败', HttpStatus.BAD_REQUEST);
    }
  }

  // 删除
  async remove(key: string) {
    const params = Object.assign(this.baseParams, {
      Key: key
    });
    const res = await this.cos.deleteObject(params);
    return res;
  }
}
