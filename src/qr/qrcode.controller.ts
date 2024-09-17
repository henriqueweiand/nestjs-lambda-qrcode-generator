import { Controller, Get } from '@nestjs/common';
import { QRCodeService } from './qrcode.service';
import { S3Service } from './s3.service';

@Controller('qr')
export class QRController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly qRCodeService: QRCodeService,
  ) { }

  @Get()
  async generateAndUploadQRCode() {
    const text = 'https://www.google.com';
    const qrCodeBuffer = this.qRCodeService.generateQRCode(text);
    const uploadResult = await this.s3Service.uploadFile('qr-code.png', qrCodeBuffer, 'image/png');

    return {
      message: 'QR Code generated and uploaded successfully',
      bucket: uploadResult,
    };
  }
}
