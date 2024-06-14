import { S3 } from "aws-sdk";

import fs from 'fs'

const s3 = new S3({
    accessKeyId: "6845e1fb02808dd2f7240bcf2887159e",
    secretAccessKey: '3472dfb2216fb9057908226afe753a72266ef843ebf3eb2b0e3a6972043d988d',
    endpoint: 'https://397d727823c8533283695b3f7b800d43.r2.cloudflarestorage.com'
})

export const uploadInS3 = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName
    }).promise()
    console.log(response)
}

export default uploadInS3