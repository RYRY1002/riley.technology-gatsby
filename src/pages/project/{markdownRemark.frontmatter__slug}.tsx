import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"

import { ThemeProvider } from '@/components/ui/theme-provider';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/outlined';

import { Footer } from '@/components/footer';

export default function BlogPost({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="relative z-[1] bg-background">
        <div id="hero" className="relative mt-8 mx-[12.5%] mb-14">
          <div id="hero-text" className="absolute bottom-4 left-4">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
          </div>
        </div>
        <div className="prose prose-zinc lg:prose-xl dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <Footer/>
    </ThemeProvider>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        videoLooping
      }
    }
  }
`