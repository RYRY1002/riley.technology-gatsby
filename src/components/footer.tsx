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

import { MaterialSymbol } from "gatsby-plugin-material-symbols";

import { getRandomTagline, getTagline } from "@/lib/taglines";

import { romanize } from "../lib/utils";

export default function Footer(this: any) {
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

  const [tagline, setTagline] = React.useState(() => {
      return (getTagline("main"));
  });
  const [taglineOpacity, setTaglineOpacity] = React.useState(1);

  function newTagline() {
    let newTagline = getRandomTagline();
    while (newTagline === tagline) {
      newTagline = getRandomTagline();
    }
    setTaglineOpacity(0);
    setTimeout(() => {
      setTagline(newTagline);
      setTaglineOpacity(1);
    }, 150);
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      newTagline();
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-background px-[12vw] w-full bottom-0 pt-[25vh] sticky z-0 block">
      <div id="footer-tagline" className="my-4 flex items-center space-x-4 h-24" onClick={newTagline}>
        <h2 id="tagline" className="text-4xl font-bold transition-opacity w-fit" style={{opacity: taglineOpacity}}>{tagline}</h2>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div id="footer-pageinfo" className="z-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
              {currentPath === "/" ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-not-allowed z-1">Home</TooltipTrigger>
                    <TooltipContent className="z-10">
                      You're already here
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to="/" className="z-1">Home</Link>
                </BreadcrumbLink>
              )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="h-[15px] w-[13px] relative">
                {/*<MaterialSymbol symbol="filter_alt" size={20} fill className="-rotate-90"/>*/}
                <svg width="15" height="13" viewBox="0 0 15 15" fill="none" className="absolute -translate-y-2/4 m-0 top-2/4"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </BreadcrumbSeparator>
              {urlArray.map((item, index) => {
                breadcrumbUrl = breadcrumbUrl + "/" + item;

                return (
                  <>
                    <BreadcrumbItem>
                    {breadcrumbUrl + "/" === currentPath ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="cursor-not-allowed z-1">{item}</TooltipTrigger>
                          <TooltipContent className="z-10">
                            You're already here
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={breadcrumbUrl} className="z-1">{item}</Link>
                      </BreadcrumbLink>
                    )}
                    </BreadcrumbItem>
                    {index !== urlArray.length - 1 && (
                      <BreadcrumbSeparator className="h-[15px] w-[13px] relative">
                        {/*<MaterialSymbol symbol="filter_alt" size={20} fill className="-rotate-90"/>*/}
                        <svg width="15" height="13" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -translate-y-2/4 m-0 top-2/4"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </BreadcrumbSeparator>
                    )}
                  </>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col justify-between mt-2 *:text-muted-foreground *:text-xs *:z-1 *:w-fit">
            <small>
              Page last compiled {buildTime}
            </small>
            <small>
              This website was built by a human, without help from artificial intelligence
            </small>
            <small className="hover:text-primary">
              <Link to="/legal">Legal stuff</Link>
            </small>
          </div>
        </div>
      </div>
      <div id="footer-copyright-deco">
        <h1 id="footer-massive-copyright">
          ©
        </h1>
        <h1 id="footer-massive-copyright">
          {romanize(new Date().getFullYear())}
        </h1>
      </div>
    </footer>
  )
}