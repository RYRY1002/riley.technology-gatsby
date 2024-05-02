import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/outlined';

function romanize (num: number) {
  if (isNaN(num))
      return NaN;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

export function Footer(this: any) {
  const query = useStaticQuery(graphql`
    query footerQuery {
      site {
        buildTime
        host
      }
      sitePage {
        path
      }
    }
  `)

  const urlArray: string[] = useLocation().pathname.split("/").filter((item) => item !== "");
  const currentPath = useLocation().pathname;
  let breadcrumbUrl = "";
  const buildTime = new Intl.DateTimeFormat('en-AU', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit', timeZone: 'Australia/Sydney' }).format(new Date(query.site.buildTime)) + " Sydney time";
  return (
    <footer className="bg-background pt-4 pb-0 px-24 w-full bottom-0">
      <div id="footer-details-recap" className="px-[10vw] mb-5 flex items-center space-x-4 h-48">
        <h2 className="text-4xl font-bold">I am a Programmer, Game Developer and Video Editor based in Sydney, Australia.</h2>
        <Separator orientation="vertical"/>
        <h2 className="text-4xl font-bold">I am a Programmer, Game Developer and Video Editor based in Sydney, Australia.</h2>
      </div>
      <div id="footer-pageinfo" className="z-[1] px-[10vw]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
            {currentPath === "/" ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-not-allowed z-[1]">Home</TooltipTrigger>
                  <TooltipContent>
                    <p>You're already here</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            )}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="h-[15px] w-[13px] relative">
              {/*<MaterialSymbol icon="filter_alt" size={20} fill className="-rotate-90"/>*/}
              <svg width="15" height="13" viewBox="0 0 15 15" fill="none" className="absolute -translate-y-2/4 m-0 top-2/4"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </BreadcrumbSeparator>
            {urlArray.map((item, index) => {
              breadcrumbUrl = breadcrumbUrl + "/" + item;

              return (
                <>
                  <BreadcrumbItem>
                  {breadcrumbUrl + "/" === currentPath ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-not-allowed z-[1]">{item}</TooltipTrigger>
                        <TooltipContent>
                          <p>You're already here</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={breadcrumbUrl} className="z-[1]">{item}</Link>
                    </BreadcrumbLink>
                  )}
                  </BreadcrumbItem>
                  {index !== urlArray.length - 1 && (
                    <BreadcrumbSeparator className="h-[15px] w-[13px] relative">
                      {/*<MaterialSymbol icon="filter_alt" size={20} fill className="-rotate-90"/>*/}
                      <svg width="15" height="13" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -translate-y-2/4 m-0 top-2/4"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </BreadcrumbSeparator>
                  )}
                </>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <small className="text-muted-foreground text-xs">
          Page last updated on {buildTime}
        </small>
      </div>
      <div id="footer-copyright-deco" className="h-[14vw] relative overflow-hidden -mt-8">
        <h1 id="footer-massive-copyright" style={{fontSize: "calc((100vw - 12rem) / (1088 / 208))"}} className="select-none absolute bottom-0 left-0 translate-y-[14%] align-text-bottom !leading-[0.78] font-bold text-nowrap bg-gradient-to-b from-[#ffffff21] to-foreground bg-clip-text text-transparent">{"© " + romanize(new Date().getFullYear())}</h1>
      </div>
    </footer>
  )
}

export default Footer;