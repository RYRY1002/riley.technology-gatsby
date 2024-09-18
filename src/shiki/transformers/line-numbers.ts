import type { ShikiTransformer } from "shiki";
import type { Element } from "hast";
import { parseRawMetaString } from "./utils";

export interface TransformerMetaLineNumbersOptions {
  /**
   * Class to apply to `<pre>` elements when line numbers are enabled.
   * 
   * @default "line-numbers"
   */
  classPre?: string;

  /**
   * Class to apply to new `<span>` elements that contain line numbers.
   * 
   * @default "line-number"
   */
  classLineNumberSpan?: string;
}

const symbol = Symbol("line-numbers");

/**
 * Putting `showLineNumbers` in the code snippet meta will add elements and classes to existing elements to allow easy styling of line numbers.
 */
export function transformerMetaLineNumbers(
  options: TransformerMetaLineNumbersOptions = {},
): ShikiTransformer {
  const {
    classPre = "line-numbers",
    classLineNumberSpan = "line-number"
  } = options;

  return {
    // #TODO: What does this do?
    //name: "@RYRY1002/transformers:meta-line-numbers",
    pre(node) {
      if (!this.options.meta.__raw) {
        return;
      } else {
        let meta = parseRawMetaString(this.options.meta.__raw);
        if (meta.showLineNumbers) {
          // #TODO: Figure out why this doesn't work
          //this.addClassToHast(node, className);
          node.properties.class += " " + classPre;
          if (meta.showLineNumbers != true) {
            (node.children[0] as Element).properties.style = `counter-reset: line-number ${meta.showLineNumbers-1};`;
          } else {
            (node.children[0] as Element).properties.style = `counter-reset: line-number;`;
          }
          return node;
        }
      }
    }
  }
}