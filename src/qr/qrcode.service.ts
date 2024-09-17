import { Injectable } from '@nestjs/common';
import * as QRCode from 'qr-image';

@Injectable()
export class QRCodeService {
    generateQRCode(text: string): Buffer | string {
        return QRCode.imageSync(text, { type: 'png' });
    }
}
