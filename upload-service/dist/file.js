"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
" 6845e1fb02808dd2f7240bcf2887159e    3472dfb2216fb9057908226afe753a72266ef843ebf3eb2b0e3a6972043d988d  https://397d727823c8533283695b3f7b800d43.r2.cloudflarestorage.com";
function getAllFiles(folderPath) {
    let allFilesArray = [];
    const allFilesandFolder = fs_1.default.readdirSync(folderPath);
    for (let index = 0; index < allFilesandFolder.length; index++) {
        // console.log(allFilesandFolder[index])
        const fullFilePath = path_1.default.join(folderPath, allFilesandFolder[index]);
        if (fs_1.default.statSync(fullFilePath).isDirectory()) {
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
exports.default = getAllFiles;
