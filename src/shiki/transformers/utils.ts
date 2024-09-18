import type { ShikiTransformer } from "shiki";

// testString = "title=\"example-file.js\" showLineNumbers"

export function parseRawMetaString(meta: string): Record<string, any> {
  const result: Record<string, any> = {};
  const pairs = meta.split(" ");

  pairs.forEach(pair => {
      const [key, value] = pair.split("=");
      if (value === undefined) {
          result[key] = true;
      } else {
          result[key] = value.replace(/"/g, "");
      }
  });

  return result;
}