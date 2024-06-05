import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"

import ThemeProvider from '@/components/ui/theme-provider';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/outlined';

import Footer from '@/components/footer';

export default function BlogPost({ data: { mdx }, children }) {
  const { frontmatter } = mdx
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="relative z-[1] bg-background">
        <div id="hero" className="relative mt-8 mx-[12.5%] mb-14 rounded-xl">
          <video id="hero-video" className="relative w-full h-[60vmin] object-cover rounded-xl" autoPlay loop muted>
            <source src={frontmatter.videoLooping.publicURL} type="video/mp4"/>
          </video>
          <div id="hero-overlay" className="absolute w-full h-full bottom-0 object-cover rounded-xl" style={{background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.93) 100%)"}}/>
          <div id="hero-text" className="absolute bottom-7 left-10 prose prose-zinc lg:prose-lg dark:prose-invert">
            <h1 className="!m-0">{frontmatter.title}</h1>
            <h4 className="!m-0">{frontmatter.date}</h4>
          </div>
        </div>
        <div className="relative pb-1 mx-[12.5%] lg:mx-auto prose-sm prose-zinc lg:prose dark:prose-invert link-styling">
          {children}
        </div>
        <div id="footer-gradient-deco" className="absolute -bottom-[2vw] z-0 h-[2vw] w-full bg-gradient-to-b from-background to-[#ffffff00]"/>
      </main>
      <Footer/>
    </ThemeProvider>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        slug
        title
        videoLooping {
          publicURL
        }
      }
    }
  }
`