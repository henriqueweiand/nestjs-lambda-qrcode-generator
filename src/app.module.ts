import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QRModule } from './qr/qrcode.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    QRModule
  ],
})
export class AppModule { }
