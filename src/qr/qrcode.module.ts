import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { QRCodeService } from './qrcode.service';
import { QRController } from './qrcode.controller';

@Module({
  imports: [],
  controllers: [QRController],
  providers: [S3Service, QRCodeService],
})
export class QRModule { }