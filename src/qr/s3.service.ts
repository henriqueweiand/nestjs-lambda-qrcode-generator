import * as AWS from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
    private s3: AWS.S3;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.s3 = new AWS.S3({
            forcePathStyle: true,
            credentials: {
                accessKeyId: configService.getOrThrow('accessKeyId'),
                secretAccessKey: configService.getOrThrow('secretAccessKey'),
            },
            endpoint: configService.getOrThrow('endpoint'),
        });
    }

    async uploadFile(key: string, body: Buffer | string, mimeType: string, folder?: string): Promise<any> {
        const fullKey = folder ? `${folder}/${key}` : key;

        const params = {
            Bucket: this.configService.getOrThrow('bucket'),
            Key: fullKey,
            Body: body,
            ContentType: mimeType,
            ACL: 'public-read' as AWS.ObjectCannedACL,
        };

        console.info('uploadFile:', {
            bucket: params.Bucket,
            key: params.Key,
            ContentType: params.ContentType
        });

        try {
            await this.s3.send(
                new AWS.PutObjectCommand(params)
            );
        } catch (e) {
            console.error('Error uploading file:', e);
            throw e;
        }

        return this._getPublicUrl(fullKey);
    }

    private _getPublicUrl(key: string): string {
        const url = `${this.configService.getOrThrow('endpoint')}/${this.configService.getOrThrow('bucket')}/${key}`;

        console.info('getPublicUrl:', url);
        return url;
    }
}
