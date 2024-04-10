import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `riley.technology`,
    siteUrl: `https://riley.technology`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-preload-fonts", "gatsby-transformer-remark", "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "media",
        "path": "static"
      },
      __key: "media"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "static/images/"
      },
      __key: "images"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "src/pages"
      },
      __key: "pages"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "posts",
        "path": "posts"
      },
      __key: "posts"
    }, {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: 'red',
        showSpinner: true
      }
    }, {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'riley.technology',
        short_name: 'riley.technology',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'static/images/icon.png'
      }
    }, {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          placeholder: 'blurred',
          breakpoints: [750, 1080, 1366, 1920, 2560, 3840],
          backgroundColor: 'transparent',
        }
      }
    }
  ]
};

export default config;
