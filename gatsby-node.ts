import * as path from "path"
import { createFilePath, createRemoteFileNode } from "gatsby-source-filesystem"

export const onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
        "@/src": path.resolve(__dirname, "src"),
        "@/static": path.resolve(__dirname, "static"),
        "@/posts": path.resolve(__dirname, "posts")
      },
    }
  })

  if (stage === "build-javascript" && getConfig().optimization.minimizer != false) {
    let config = getConfig();
    config.optimization.minimizer = config.optimization.minimizer.filter((plugin) => {
      return plugin.constructor.name !== "CssMinimizerPlugin";
    });
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, printTypeDefinitions } = actions;
  /*createTypes(`
    type MdxFrontmatterImages {
      remoteProcessed: [File] @link(from: "remote")
    }
  `)*/
  createTypes(`
    type Mdx implements Node {
      remoteImages: [File] @link(from: "fields.remoteImagesId")
    }
    type VideoMetadata implements Node {
      associatedPost: SitePage @link(from: "associatedPost")
    }`)
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return graphql(`
    query nodeQuery {
      allMdx(
        sort: {frontmatter: {date: DESC}}
        limit: 1000
        filter: {frontmatter: {type: {eq: "post"}}}
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              date(formatString: "DD MMM, YYYY")
              title
              subtitle
              links {
                title
                url
              }
              image {
                relativePath
              }
              video {
                relativePath
              }
              videoLooping {
                relativePath
              }
              tags
            }
            internal {
              contentFilePath
            }
            excerpt
            tableOfContents
          }
        }
      }
      allVideoMetadata(
        sort: {date: DESC}
        limit: 1000
      ) {
        edges {
          node {
            title
            description
            date(formatString: "MMMM DD, YYYY")
            src
            poster {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
            posters {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
            thumbnails {
              relativePath
            }
            textTracks {
              src {
                relativePath
              }
              label
              language
              kind
              type
              default
            }
            this {
              relativeDirectory
            }
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMdx.edges;
    // Create homepage w/ pagination
    {
      const postsPerPage = 12;
      const numPages = Math.ceil(posts.length / postsPerPage);
  
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/` : `/${i + 1}`,
          component: path.resolve('./src/templates/blog-list.tsx'),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1
          },
        });
      });
    }

    const videos = result.data.allVideoMetadata.edges;
    // Create videos list w/ pagination
    {
      const videosPerPage = 6;
      const numPages = Math.ceil(videos.length / videosPerPage);
  
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/videos` : `/videos/${i + 1}`,
          component: path.resolve('./src/templates/videos-list.tsx'),
          context: {
            limit: videosPerPage,
            skip: i * videosPerPage,
            numPages,
            currentPage: i + 1
          },
        });
      });
    }

    // Create post pages
    {
      const component = path.resolve("./src/templates/post.tsx");
      posts.forEach(({ node }, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: "/project" + "/" + node.frontmatter.slug,
          component: `${component}?__contentFilePath=${node.internal.contentFilePath}`,
          context: {
            id: node.id,
            slug: node.frontmatter.slug,
            date: node.frontmatter.date,
            title: node.frontmatter.title,
            subtitle: node.frontmatter.subtitle,
            links: node.frontmatter.links,
            imageUrl: node.frontmatter.image?.relativePath,
            videoUrl: node.frontmatter.video?.relativePath,
            videoLoopingUrl: node.frontmatter.videoLooping?.relativePath,
            tags: node.frontmatter.tags,
            excerpt: node.excerpt,
            tableOfContents: node.tableOfContents,
            previous,
            next,
          },
        });
      });
    }
  })
}

exports.onCreateNode = async ({ node, createNodeId, actions: { createNodeField, createNode }, getNode, getCache }) => {
  /*if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }*/

  if (node.internal.type === "Mdx" && node.frontmatter.images) {
    if (node.frontmatter.images.remote) {
      let remoteImages = await Promise.all(
        node.frontmatter.images.remote.map(async (url: string) => {
          try {
            return createRemoteFileNode({
              url,
              parentNodeId: node.id,
              createNode,
              createNodeId,
              getCache
            });
          } catch (error) {
            console.error(`Failed to fetch ${url}`, error);
          };
        })
      );
      if (remoteImages.length > 0) {
        createNodeField({
          node,
          name: "remoteImagesId",
          value: remoteImages.map((fileNode) => fileNode.id)
        });
        console.info(`Downloaded remote images for ${node.frontmatter.title}`);
      };
    };
    /*if (node.frontmatter.images.local) {
      createNodeField({
        node,
        name: "localImagesId",
        value: node.frontmatter.images.local.id.map((fileNode) => fileNode.id)
      }); // This is just here for parity with remote images. It's not used anywhere.
    }*/
  };
}