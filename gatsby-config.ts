import type { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
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
    DETECT_NODE_MUTATIONS: false // Do not enable this in production builds, it will cause it to fail!
  },
  plugins: [
    "gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-preload-fonts", 
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        mdxOptions: {
          remarkPlugins: [
            [require("gatsby-remark-vscode").remarkPlugin, {
              theme: {
                default: "Light+ (default light)",
                dark: "Dark+ (default dark)"
              }
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
          formats: ["webp"],
          placeholder: "blurred",
          breakpoints: [480, 720, 1080, 1366, 1920, 2560, 3840],
          backgroundColor: "transparent"
        }
      }
    }, {
      resolve: "gatsby-plugin-purgecss",
      options: {
        printRejected: false,
        tailwind: true,
        //develop: true,
        purgeCSSOptions: {
          content: [
            path.join(process.cwd(), "src/**/!(*.d).{ts,js,jsx,tsx,md,mdx}"),

            // This will absolutely nuke build performance.
            //path.join(process.cwd(), "node_modules/**/!(*.d).{ts,js,jsx,tsx,md,mdx}"),
          ],
          safelist: [
            "material-symbols"
          ]
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
