"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idGenerator = void 0;
const MAX_LENGTH = 5;
function idGenerator() {
    let ans = "";
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    for (let i = 0; i < MAX_LENGTH; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}
exports.idGenerator = idGenerator;
