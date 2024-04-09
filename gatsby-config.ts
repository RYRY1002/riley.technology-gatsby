import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `riley.technology`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-preload-fonts", "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "media",
        "path": "src/media/"
      },
      __key: "media"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "src/media/images/"
      },
      __key: "images"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "src/pages/"
      },
      __key: "pages"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "posts",
        "path": "src/posts/"
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
        icon: 'src/media/images/icon.png'
      }
    }
  ]
};

export default config;
