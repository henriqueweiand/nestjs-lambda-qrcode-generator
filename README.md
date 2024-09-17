# nestjs-lambda-qrcode-generator


## Description

A NestJS application designed to generate QR codes using AWS Lambda and store the QR Code inside AWS S3.
This project leverages the power of serverless architecture to provide a scalable and efficient QR code generation service.

#### Technologies
- NestJS
- Serverless

## Running local

1. Clone && install depenencies
1. Rename .env.example to .env
2. run `yarn local`
3. Access `http://localhost:3000/dev/qrcode/generate?qrCodeURL=https://google.com/`
4. After accessing the route above, you can get the link of the image

* All files will be located inside ./buckets/qr-codes

## Running production

1. Configure your AWS Credentials `aws configure`
2. Create the bucket on S3 with ACL, and give public permission for reading
3. Make sure .env.prod has the configurations as you need
4. Configure serverless `serverless`
5. Execute `yarn deploy`
6. Get the link of your lambda and execute

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
