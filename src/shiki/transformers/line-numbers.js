"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformerMetaLineNumbers = transformerMetaLineNumbers;
const utils_1 = require("./utils");
const symbol = Symbol("line-numbers");
/**
 * Putting `showLineNumbers` in the code snippet meta will add elements and classes to existing elements to allow easy styling of line numbers.
 */
function transformerMetaLineNumbers(options = {}) {
    const { classPre = "line-numbers", classLineNumberSpan = "line-number" } = options;
    return {
        // #TODO: What does this do?
        //name: "@RYRY1002/transformers:meta-line-numbers",
        pre(node) {
            if (!this.options.meta.__raw) {
                return;
            }
            else {
                let meta = (0, utils_1.parseRawMetaString)(this.options.meta.__raw);
                if (meta.showLineNumbers) {
                    // #TODO: Figure out why this doesn't work
                    //this.addClassToHast(node, className);
                    node.properties.class += " " + classPre;
                    if (meta.showLineNumbers != true) {
                        node.children[0].properties.style = `counter-reset: line-number ${meta.showLineNumbers};`;
                    }
                    else {
                        node.children[0].properties.style = `counter-reset: line-number;`;
                    }
                    return node;
                }
            }
        }
    };
}
