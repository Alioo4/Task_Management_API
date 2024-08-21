import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @ApiTags('uploads')
  @ApiBearerAuth()
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 10, // 10 MB
          }),
          new FileTypeValidator({
            fileType: /^(image\/(png|jpg|jpeg|svg\+xml|heic|gif|webp)|application\/pdf|video\/mp4)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return await this.uploadsService.create({
        fileName: file.originalname,
        fileType: file.mimetype,
        body: file.buffer,
      });
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
}

