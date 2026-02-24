import * as React from "react";
import { Link, PageProps } from "gatsby";

import ThemeProvider from "@/components/ui/theme-provider";

import { cn } from "@/lib/utils";

import { StaticImage } from "gatsby-plugin-image";

import Footer from "@/components/footer";
import { MaterialSymbol } from "gatsby-plugin-material-symbols";

const LegalPage: React.FC<PageProps> = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="prose mt-10">
        <h2 id="tracking-notice">This website does not track you, stores no cookies and has no third-party analytics.</h2>
        <h2 id="this-website-was-built-entirely-by-me-with-gatsby-a-fast-and-flexible-static-site-generator.">This website was built entirely by me with <a href="https://www.gatsbyjs.com/">Gatsby</a>, a fast and flexible static site generator.</h2>
        <p>© Riley Cunningham (RYRY1002) 2023-2026<br />
           © Gatsby 2015-2026, licensed under MIT</p>
        <h2 id="a-bunch-of-other-stuff-also-made-this-site-possible-and-you-can-find-a-comprehensive-list-below.">A bunch of other stuff also made this site possible, and you can find a comprehensive list below.</h2>
        <p>BF Sans (the typeface you’re reading this with) is based on “Barlow” © <a href="https://github.com/jpt/barlow">The Barlow Project Authors</a> 2017. Some modifications are © Electronic Arts 2018, others are © 2025-2026 Riley Cunningham (RYRY1002).</p>
        <p>Material Symbols are © Google 2022-2026, licensed under Apache-2.0. Material Symbols are embedded on this site with <a href="https://github.com/RYRY1002/gatsby-plugin-material-symbols"><code>gatsby-plugin-material-symbols</code></a>, a plugin for Gatsby made by me. © Riley Cunningham (RYRY1002) 2024-2025.</p>
        <p>Video player built with <a href="https://vidstack.io/">Vidstack</a>, a collection of UI components and hooks for building media players on the web. © Vidstack 2023-2026, licensed under MIT.</p>
        <p>This site uses <a href="https://tailwindcss.com/">Tailwind</a> for its styling. © Tailwind Labs 2017-2026, licensed under MIT.</p>
        <p>Code is rendered in markdown with <a href="http://shiki.style/">Shiki</a>. © Pine Wu 2021, © Anthony Fu 2023-2026, licensed under MIT.</p>
        <p>Math is rendered in markdown with <a href="https://katex.org/">KaTeX</a>. © Khan Academy and <a href="https://github.com/KaTeX/KaTeX/graphs/contributors">contributors</a> 2013-2020, licensed under MIT.<br />
           KaTeX is embedded into Gatsby with<a href="https://www.gatsbyjs.com/plugins/gatsby-remark-katex/"><code>gatsby-remark-katex</code></a>. © Gatsby 2017-2026, licensed under MIT.</p>
      </main>
    </ThemeProvider>
  )
}
export default LegalPage

export const Head = () => (
  <>
    <title>Legal stuff</title>
  </>
)