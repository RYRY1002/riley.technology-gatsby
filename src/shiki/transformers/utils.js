"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRawMetaString = parseRawMetaString;
// testString = "title=\"example-file.js\" showLineNumbers"
function parseRawMetaString(meta) {
    const result = {};
    const pairs = meta.split(" ");
    pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        if (value === undefined) {
            result[key] = true;
        }
        else {
            result[key] = value.replace(/"/g, "");
        }
    });
    return result;
}
