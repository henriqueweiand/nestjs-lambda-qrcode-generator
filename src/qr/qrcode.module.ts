import { Module } from '@nestjs/common';
import { QRController } from './qrcode.controller';
import { QRCodeService } from './qrcode.service';
import { S3Service } from './s3.service';

@Module({
  controllers: [QRController],
  providers: [S3Service, QRCodeService],
})
export class QRModule { }