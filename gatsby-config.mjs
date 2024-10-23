//import type { GatsbyConfig } from "gatsby";
import path from "path";

import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerRemoveNotationEscape
} from "@shikijs/transformers";
import { transformerMetaLineNumbers } from "./src/shiki/transformers/line-numbers.js";

const config = {
  siteMetadata: {
    title: `riley.technology`,
    siteUrl: `https://riley.technology`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: false,
    FAST_DEV: true,
    DETECT_NODE_MUTATIONS: false, // Do not enable this in production builds, it will cause it to fail!
    PARTIAL_HYDRATION: false
  },
  plugins: [
    "gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-preload-fonts",
    /* We really shouldn't have gatsby-transformer-remark still here as we're using MDX now.
       Unfortunately, gatsby-plugin-mdx doesn't seem to execute gatsby-ssr.js in any of the gatsbyRemarkPlugins you give it while gatsby-transformer-remark does.
       gatsby-remark-autolink-headers does all of its stuff in the gatsby-ssr.js file and so we need to have this here for the plugin to work.
       Thanks, I hate it. */
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              icon: `<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path d="M 6.951 11.957 L 3.956 11.957 C 2.857 11.957 1.921 11.573 1.153 10.802 C 0.384 10.032 0 9.098 0 7.996 C 0 6.893 0.384 5.959 1.153 5.193 C 1.921 4.427 2.857 4.043 3.956 4.043 L 6.951 4.043 L 6.951 5.477 L 3.953 5.477 C 3.258 5.477 2.663 5.721 2.172 6.212 C 1.679 6.701 1.434 7.297 1.434 7.998 C 1.434 8.698 1.679 9.294 2.169 9.787 C 2.659 10.278 3.257 10.524 3.956 10.524 L 6.951 10.524 L 6.951 11.957 Z M 5.006 8.706 L 5.006 7.274 L 10.994 7.274 L 10.994 8.706 L 5.006 8.706 Z M 9.049 11.957 L 9.049 10.524 L 12.047 10.524 C 12.742 10.524 13.337 10.279 13.828 9.789 C 14.321 9.298 14.566 8.703 14.566 8.004 C 14.566 7.302 14.322 6.706 13.831 6.215 C 13.341 5.722 12.743 5.477 12.043 5.477 L 9.049 5.477 L 9.049 4.043 L 12.043 4.043 C 13.143 4.043 14.077 4.428 14.846 5.197 C 15.615 5.967 16 6.903 16 8.005 C 16 9.106 15.615 10.042 14.846 10.808 C 14.077 11.575 13.143 11.957 12.043 11.957 L 9.049 11.957 Z"/></svg>`,
            }
          },
          {
            resolve: "gatsby-remark-katex",
            options: {
              strict: "ignore"
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          /* This needs to be here so that the markdown in mdx files still gets converted into MarkdownAST nodes that gatsby-transformer-remark can use with it's plugins.
             We might not need to list the plugins here, but my gut tells something will not work if we don't. */
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              icon: `<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path d="M 6.951 11.957 L 3.956 11.957 C 2.857 11.957 1.921 11.573 1.153 10.802 C 0.384 10.032 0 9.098 0 7.996 C 0 6.893 0.384 5.959 1.153 5.193 C 1.921 4.427 2.857 4.043 3.956 4.043 L 6.951 4.043 L 6.951 5.477 L 3.953 5.477 C 3.258 5.477 2.663 5.721 2.172 6.212 C 1.679 6.701 1.434 7.297 1.434 7.998 C 1.434 8.698 1.679 9.294 2.169 9.787 C 2.659 10.278 3.257 10.524 3.956 10.524 L 6.951 10.524 L 6.951 11.957 Z M 5.006 8.706 L 5.006 7.274 L 10.994 7.274 L 10.994 8.706 L 5.006 8.706 Z M 9.049 11.957 L 9.049 10.524 L 12.047 10.524 C 12.742 10.524 13.337 10.279 13.828 9.789 C 14.321 9.298 14.566 8.703 14.566 8.004 C 14.566 7.302 14.322 6.706 13.831 6.215 C 13.341 5.722 12.743 5.477 12.043 5.477 L 9.049 5.477 L 9.049 4.043 L 12.043 4.043 C 13.143 4.043 14.077 4.428 14.846 5.197 C 15.615 5.967 16 6.903 16 8.005 C 16 9.106 15.615 10.042 14.846 10.808 C 14.077 11.575 13.143 11.957 12.043 11.957 L 9.049 11.957 Z"/></svg>`,
            }
          },
          {
            resolve: "gatsby-remark-katex",
            options: {
              strict: "ignore"
            }
          }
        ],
        mdxOptions: {
          remarkPlugins: [
            remarkGfm
          ],
          rehypePlugins: [
            [rehypeShiki, {
              themes: {
                dark: "dark-plus",
                light: "light-plus"
              },
              inline: "tailing-curly-colon",
              transformers: [
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerMetaHighlight(),
                transformerMetaWordHighlight(),
                transformerNotationFocus(),
                transformerNotationErrorLevel(),
                transformerRemoveNotationEscape(),
                transformerMetaLineNumbers()
              ]
            }]
          ]
        }
      }
    }, "gatsby-transformer-sharp", {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": "media",
        "path": "static"
      },
      __key: "media"
    }, {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": "pages",
        "path": "src/pages"
      },
      __key: "pages"
    }, {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": "posts",
        "path": "posts"
      },
      __key: "posts"
    }, {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#ff5e27",
        showSpinner: false
      }
    }, {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "riley.technology",
        short_name: "riley.technology",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#663399",
        display: "standalone",
        icon: "static/images/icon.png"
      }
    }, {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: ["avif", "webp"],
          placeholder: "blurred",
          breakpoints: [480, 720, 1080, 1366, 1920, 2560, 3840],
          backgroundColor: "transparent",
          blurredOptions: {
            toFormat: "webp",
            width: 48
          }
        }
      }
    }, {
      resolve: "gatsby-plugin-posthog",
      options: {
        apiKey: "phc_FznuSwNvDr8kZemdu5laB3UmGx9Qx2pglYxsgUDnghR",
        head: true,
        isEnabledDevMode: false
      }
    }
  ]
};

export default config;
