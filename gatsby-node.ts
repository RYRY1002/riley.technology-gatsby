import * as path from "path"
import { createFilePath } from "gatsby-source-filesystem"

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    query nodeQuery {
      allMdx(sort: {frontmatter: {date: DESC}}, limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              title
              video {
                relativePath
              }
              videoLooping {
                relativePath
              }
              tags
              date(formatString: "DD MMM, YYYY")
              image {
                relativePath
              }
            }
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create homepage w/ pagination
    {
      const posts = result.data.allMdx.edges;
      const postsPerPage = 2;
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

    // Create post pages
    {
      const posts = result.data.allMdx.edges;
      const component = path.resolve("./src/templates/post.tsx");
      posts.forEach(({ node }, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: "/project" + node.fields.slug,
          component: `${component}?__contentFilePath=${node.internal.contentFilePath}`,
          context: {
            id: node.id,
            slug: node.fields.slug,
            title: node.frontmatter.title,
            tags: node.frontmatter.tags,
            date: node.frontmatter.date,
            imageUrl: node.frontmatter.image.relativePath,
            videoUrl: node.frontmatter.video?.relativePath,
            videoLoopingUrl: node.frontmatter.videoLooping?.relativePath,
            previous,
            next,
          },
        });
      });
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}