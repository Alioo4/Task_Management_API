import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Injectable()
export class UploadsService {
  private readonly client: S3Client;

  constructor(private readonly config: ConfigService) {
    console.log(new Date());

    this.client = new S3Client({
      endpoint: config.get<string>('R2_ENDPOINT'),
      region: 'auto',
      credentials: {
        accessKeyId: config.get<string>('R2_ACCESS_KEY'),
        secretAccessKey: config.get<string>('R2_SECRET_KEY'),
      },
    });
  }

  async create(file: {
    fileName: string;
    fileType: string;
    body: Buffer;
  }): Promise<{ name: string }> {
    const name = `${randomUUID()}${extname(file.fileName)}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.config.get<string>('R2_BUCKET'),
        Key: name,
        ContentType: file.fileType,
        Body: file.body,
      }),
    );

    return { name };
  }
}

