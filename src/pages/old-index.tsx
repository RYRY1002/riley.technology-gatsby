import * as React from "react"
import { Link, type PageProps } from "gatsby"

import { ThemeProvider } from "next-themes"

import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { NavMenu } from "@/components/navbar"

import Spline from "@splinetool/react-spline"

import v4loop from "../../static/videos/v4_loop.mp4";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main >
        <ThemeToggleButton/>
        <video className="fixed top-0 left-0 w-full h-full object-cover z-[-1]" autoPlay loop muted>
            <source src={v4loop} type="video/mp4"/>
        </video>
        <div id="hero" className="px-20 pt-12 h-screen w-screen">
          <h1 className="text-6xl font-bold mb-5 relative">I am a Programmer, Game Developer and Video Editor based in Sydney, Australia.</h1>
          <div className="relative fill-foreground">
            <Link to="https://www.youtube.com/@RYRY1002" className="pr-1">
              <svg className="fill-foreground w-[1.4em] h-[1.4em] inline-block"><path className="text-foreground" d="m20.06,5.06c-.24-.88-.93-1.58-1.82-1.82-1.6-.43-8.01-.43-8.01-.43,0,0-6.41,0-8.01.43-.88.24-1.57.93-1.81,1.82C0,6.66,0,10,0,10,0,10,0,13.34.43,14.94c.24.88.93,1.58,1.82,1.82,1.6.43,8.01.43,8.01.43,0,0,6.41,0,8.01-.43.88-.24,1.58-.93,1.82-1.82.43-1.6.43-4.94.43-4.94,0,0,0-3.34-.43-4.94h0Zm-11.87,8.01v-6.15l5.32,3.08-5.32,3.07Z"></path></svg>
            </Link>
            <Link to="https://github.com/RYRY1002" className="pr-1">
              <svg className="fill-foreground w-[1.4em] h-[1.4em] inline-block"><path className="text-foreground" d="m10.25,0c5.66,0,10.25,4.59,10.25,10.25,0,4.4-2.81,8.32-6.98,9.73-.51.1-.7-.22-.7-.49,0-.35.01-1.45.01-2.82,0-.96-.32-1.58-.69-1.9,2.28-.26,4.68-1.13,4.68-5.06,0-1.13-.4-2.04-1.05-2.76.1-.26.46-1.31-.1-2.72,0,0-.86-.28-2.82,1.05-.82-.23-1.69-.35-2.56-.35s-1.74.12-2.56.35c-1.96-1.32-2.82-1.05-2.82-1.05-.56,1.41-.21,2.46-.1,2.72-.65.72-1.05,1.64-1.05,2.76,0,3.92,2.38,4.81,4.67,5.06-.29.26-.56.7-.65,1.37-.59.27-2.06.7-2.99-.85-.19-.31-.77-1.06-1.58-1.05-.86.01-.35.49.01.68.44.24.94,1.15,1.05,1.45.21.58.87,1.68,3.45,1.2,0,.86.01,1.67.01,1.91,0,.27-.19.58-.7.49C2.82,18.59,0,14.67,0,10.25,0,4.59,4.58,0,10.25,0Z"></path></svg>
            </Link>
            <Link to="https://www.linkedin.com/RYRY1002" className="pr-1">
              <svg className="fill-foreground w-[1.4em] h-[1.4em] inline-block"><path className="text-foreground" d="m17.18,16.77h-2.92v-4.57c0-1.09-.02-2.49-1.52-2.49s-1.75,1.19-1.75,2.41v4.65h-2.92V7.38h2.8v1.28h.04c.57-.98,1.63-1.56,2.76-1.52,2.96,0,3.5,1.94,3.5,4.47v5.15ZM4.79,6.09c-.93,0-1.69-.76-1.69-1.69s.76-1.69,1.69-1.69c.93,0,1.69.76,1.69,1.69s-.76,1.69-1.69,1.69h0m1.46,10.68h-2.92V7.38h2.92v9.39ZM18.63,0H1.86C1.07,0,.42.63.41,1.42v16.84c0,.79.66,1.43,1.45,1.42h16.77c.79,0,1.45-.63,1.46-1.42V1.42c-.01-.79-.66-1.43-1.46-1.42"></path></svg>
            </Link>
            <Link to="https://discord.gg/atXVysHGVt" className="">
              <svg className="fill-foreground w-[1.4em] h-[1.4em] inline-block"><path className="text-foreground" d="m16.67,3.71c-1.29-.59-2.66-1.01-4.06-1.25-.19.34-.37.7-.52,1.06-1.49-.23-3.01-.23-4.51,0-.15-.36-.33-.71-.52-1.06-1.4.24-2.77.66-4.06,1.25C.43,7.52-.26,11.22.08,14.88H.08c1.5,1.11,3.19,1.96,4.98,2.5.4-.54.76-1.12,1.07-1.72-.58-.22-1.14-.49-1.68-.8.14-.1.28-.21.41-.31,3.15,1.48,6.8,1.48,9.96,0,.13.11.27.22.41.31-.54.32-1.1.59-1.68.8.31.6.66,1.18,1.07,1.72,1.79-.54,3.48-1.39,4.98-2.5h0c.41-4.24-.7-7.91-2.93-11.17ZM6.57,12.63c-.97,0-1.77-.88-1.77-1.96s.77-1.97,1.77-1.97,1.79.89,1.77,1.97-.78,1.96-1.77,1.96Zm6.54,0c-.97,0-1.77-.88-1.77-1.96s.77-1.97,1.77-1.97,1.79.89,1.77,1.97-.78,1.96-1.77,1.96Z"></path></svg>
            </Link>
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
export default IndexPage

export const Head = () => (
  <>
    <title>riley.technology</title>
  </>
)