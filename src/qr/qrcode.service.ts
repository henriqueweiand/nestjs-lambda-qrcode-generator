import { Injectable } from '@nestjs/common';
import * as QRCode from 'qr-image';

@Injectable()
export class QRCodeService {
    generateQRCode(text: string): Buffer | string {
        console.info('generateQRCode:', text);

        try {
            return QRCode.imageSync(text, { type: 'png' });
        } catch (e) {
            console.error('Error generating QR Code:', e);
            throw e;
        }
    }
}
