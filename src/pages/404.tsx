import * as React from "react"
import { Link, HeadFC, PageProps, navigate } from "gatsby"

import { ThemeProvider } from "next-themes";
import ThemeToggleButton from "@/components/theme-toggle-button";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main>
        <section id="center" className="flex justify-center flex-col m-auto h-screen">
          <div className="flex flex-col gap-0 space-y-20 m-auto">
            <div className="flex flex-row gap-0">
              <div id="one" className="flex flex-col gap-0">
                <h1 id="one" className="text-[20rem] leading-[85%] font-bold text-center">4</h1>
                <svg className="h-[30px] fill-foreground" viewBox="-6.8 0 192 30.2">
                  <path d="m178.28,0v11.86c0,2.04-.55,3.55-1.66,4.53-1.11.98-2.59,1.47-4.46,1.47h-67.78c-3.74,0-6.52,1.15-8.35,3.44-1.83,2.29-2.74,5.27-2.74,8.92h-7.65c0-3.66-.91-6.63-2.74-8.92-1.83-2.3-4.61-3.44-8.35-3.44H6.12c-1.87,0-3.36-.49-4.46-1.47-1.1-.98-1.66-2.49-1.66-4.53V0h4.59v12.88h69.57c2.63,0,4.99.51,7.08,1.53,2.08,1.02,3.76,2.46,5.04,4.33,1.27,1.87,2,4.04,2.17,6.5h2.04c.17-2.47.89-4.63,2.17-6.5,1.27-1.87,2.95-3.31,5.04-4.33,2.08-1.02,4.44-1.53,7.08-1.53h68.93V0h4.59Z"/>
                </svg>
                <p id="one" className="text-xl text-center">Client error</p>
              </div>
              <div id="two" className="flex flex-col gap-0">
                <h1 id="two" className="text-[20rem] leading-[85%] font-bold text-center">04</h1>
                <svg className="h-[30px] fill-foreground" viewBox="-6.8 0 384 30.2">
                  <path d="m369.96,0v11.86c0,2.04-.55,3.55-1.66,4.53-1.11.98-2.59,1.47-4.46,1.47h-163.46c-3.74,0-6.52,1.15-8.35,3.44-1.83,2.29-2.74,5.27-2.74,8.92h-7.65c0-3.66-.91-6.63-2.74-8.92-1.83-2.3-4.61-3.44-8.35-3.44H6.12c-1.87,0-3.36-.49-4.46-1.47-1.1-.98-1.66-2.49-1.66-4.53V0h4.59v12.88h165.57c2.63,0,4.99.51,7.08,1.53,2.08,1.02,3.76,2.46,5.04,4.33,1.27,1.87,2,4.04,2.17,6.5h2.04c.17-2.47.89-4.63,2.17-6.5,1.27-1.87,2.95-3.31,5.04-4.33,2.08-1.02,4.44-1.53,7.08-1.53h164.61V0h4.59Z"/>
                </svg>
                <p id="two" className="text-xl text-center">Page not found</p>
              </div>
            </div>
            <section id="cta" className="m-auto">
              <a className="cursor-pointer text-3xl text-[#ff5e27] dark:text-[#27c8ff] font-medium text-center !font-sans hover:font-extrabold transition-varfonts duration-100" onClick={() => navigate(-1)}>
                Let's head back
              </a>
            </section>
          </div>
        </section>
        <ThemeToggleButton/>
      </main>
    </ThemeProvider>
  )
}
export default NotFoundPage

export const Head = () => (
  <>
    <title>404</title>
  </>
)
