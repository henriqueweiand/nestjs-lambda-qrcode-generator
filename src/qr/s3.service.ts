import * as AWS from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
    private s3: AWS.S3;

    constructor(
        private readonly configService: ConfigService,
    ) {
        const isProduction = process.env.NODE_ENV === 'production';

        const s3Config: AWS.S3ClientConfig = {
            forcePathStyle: true,
        };

        if (!isProduction) {
            s3Config.credentials = {
                accessKeyId: configService.getOrThrow('accessKeyId'),
                secretAccessKey: configService.getOrThrow('secretAccessKey'),
            };
            s3Config.endpoint = configService.getOrThrow('endpoint');
        }

        this.s3 = new AWS.S3(s3Config);
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
        const isProduction = process.env.NODE_ENV === 'production';
        let url: string;

        if (isProduction) {
            url = `https://${this.configService.getOrThrow('bucket')}.s3.amazonaws.com/${key}`;
        } else {
            url = `${this.configService.getOrThrow('endpoint')}/${this.configService.getOrThrow('bucket')}/${key}`;
        }

        console.info('getPublicUrl:', url);
        return url;
    }
}
