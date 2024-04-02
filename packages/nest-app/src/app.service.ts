import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/prisma/prisma.service';
import { SacrificesDto } from './common/dto';
import { transformDateTime } from 'src/utils';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async saveFile(file: Express.Multer.File) {
    const resourcePath = path.resolve(__dirname, '../resource/images');
    const fileNamePrefix = Math.round(new Date().getTime() / 1000);
    let fileName = String(fileNamePrefix);
    switch (file.mimetype) {
      case 'image/png':
        fileName += '.png';
        break;
      case 'image/jpg':
        fileName += '.jpg';
        break;
      case 'image/gif':
        fileName += '.gif';
        break;
      case 'image/jpeg':
        fileName += '.jpeg';
        break;
    }
    if (!fs.existsSync(resourcePath)) {
      fs.mkdirSync(resourcePath, {
        recursive: true
      });
    }
    fs.writeFileSync(path.resolve(resourcePath, fileName), file.buffer);
    const host = this.configService.get('HOST');
    const url = host + `/images/${fileName}`;
    return url;
  }

  async getSacrificesById(id: number) {
    const result = await this.prismaService.sacrifice.findUnique({
      where: { id }
    });
    return transformDateTime(result);
  }

  async addSacrifices(data: SacrificesDto) {
    await this.prismaService.sacrifice.create({
      data
    });
  }

  async getSacrificesCount() {
    return this.prismaService.sacrifice.count();
  }

  async getFirstSacrifices() {
    const result = await this.prismaService.sacrifice.findFirst();
    return transformDateTime(result);
  }

  async removeFirstSacrifices() {
    const firstData = await this.getFirstSacrifices();
    if (firstData) {
      await this.prismaService.sacrifice.delete({
        where: {
          id: firstData.id
        }
      });
    }
  }
}
