import fs from 'fs';
import path from 'path';

" 6845e1fb02808dd2f7240bcf2887159e    3472dfb2216fb9057908226afe753a72266ef843ebf3eb2b0e3a6972043d988d  https://397d727823c8533283695b3f7b800d43.r2.cloudflarestorage.com"



export default function getAllFiles(folderPath: string): string[] {
    let allFilesArray: string[] = []
    const allFilesandFolder = fs.readdirSync(folderPath);

    for (let index = 0; index < allFilesandFolder.length; index++) {
        // console.log(allFilesandFolder[index])
        const fullFilePath = path.join(folderPath, allFilesandFolder[index])
        if (fs.statSync(fullFilePath).isDirectory()) {
            // console.log(fullFilePath)
            allFilesArray = allFilesArray.concat(getAllFiles(fullFilePath));
        }
        else {
            allFilesArray.push(fullFilePath);
        }

    }
    console.log(allFilesArray);
    return allFilesArray;

}



