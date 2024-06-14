import express, { Request, Response } from 'express';
import cors from "cors";
import simpleGit from 'simple-git';
import { idGenerator } from './utils';
import getAllFiles from './file';
import uploadInS3 from './aws';
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();


const app = express();
app.use(cors())
app.use(express.json())
app.post("/deploy", async ( req : Request , res :Response ) =>{

const repourl = req.body.repoUrl
console.log(repourl);


const id = idGenerator();
await simpleGit().clone(repourl , __dirname+`/output/${id}`)
 const allfilesArray = getAllFiles(  __dirname+`/output/${id}`)
 allfilesArray.forEach(async file => {
    await uploadInS3(file.slice(__dirname.length + 1), file)
 });

 await new Promise((resolve) => setTimeout(resolve, 10000))

 publisher.lPush("build-queue" , id)
 publisher.hSet("status", id, "uploaded");

   return res.json({
   id : id
   })
})


app.get("/status", async (req, res) => {
   const id = req.query.id;
   const response = await subscriber.hGet("status", id as string);
   res.json({
       status: response
   })
})




app.listen(3000 , ()=>{
    console.log('server is running on port 3000', "url is http://localhost:3000")
})
