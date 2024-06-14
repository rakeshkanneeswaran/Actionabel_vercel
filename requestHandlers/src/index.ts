import { S3 } from "aws-sdk";
import express from 'express'

const s3 = new S3({
    accessKeyId: "6845e1fb02808dd2f7240bcf2887159e",
    secretAccessKey: '3472dfb2216fb9057908226afe753a72266ef843ebf3eb2b0e3a6972043d988d',
    endpoint: 'https://397d727823c8533283695b3f7b800d43.r2.cloudflarestorage.com'
})


const app = express();

app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;

    const id = host.split(".")[0];
    console.log(id)
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001 , ()=>{
    console.log("server is running on port 3001")
});