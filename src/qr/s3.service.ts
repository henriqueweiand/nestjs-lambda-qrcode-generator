import * as AWS from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            forcePathStyle: true,
            credentials: {
                accessKeyId: "S3RVER", // This specific key is required when working offline
                secretAccessKey: "S3RVER",
            },
            endpoint: "http://localhost:4569",
        });
    }

    async uploadFile(key: string, body: Buffer | string, mimeType: string): Promise<any> {
        const params = {
            Bucket: 'qr-code-bucket', // Nome do bucket emulado
            Key: key,
            Body: body,
            ContentType: mimeType,
            ACL: 'public-read' as AWS.ObjectCannedACL,
        };

        await this.s3.send(
            new AWS.PutObjectCommand(params)
        );

        return this.getPublicUrl(key);
    }

    getPublicUrl(key: string): string {
        return `http://localhost:4569/qr-code-bucket/${key}`;
    }
}
