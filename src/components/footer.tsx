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
    <footer className="bg-background px-[12vw] max-md:px-8 w-full bottom-0 pt-[25vh] sticky z-0 block">
      <div id="footer-tagline" className="my-4 flex space-x-4 h-24 items-end">
        <h2 id="tagline" className="text-4xl max-md:text-xl font-bold transition-opacity w-fit align-bottom" style={{opacity: taglineOpacity}}>{tagline}</h2>
      </div>
      <div className="flex flex-row max-md:flex-col-reverse md:justify-between md:items-center max-md:pb-8">
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
          <div className="flex flex-col justify-between mt-2 *:text-muted-foreground *:text-xs max-md:*:text-2xs *:z-1 *:w-fit">
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
          <div id="socials" className="fill-foreground flex gap-1">
            <Link id="social-link" to="https://www.youtube.com/@RYRY1002">
              <svg className="fill-foreground w-[1.4em] h-[1.4em] inline-block"><path className="text-foreground" d="m20.06,5.06c-.24-.88-.93-1.58-1.82-1.82-1.6-.43-8.01-.43-8.01-.43,0,0-6.41,0-8.01.43-.88.24-1.57.93-1.81,1.82C0,6.66,0,10,0,10,0,10,0,13.34.43,14.94c.24.88.93,1.58,1.82,1.82,1.6.43,8.01.43,8.01.43,0,0,6.41,0,8.01-.43.88-.24,1.58-.93,1.82-1.82.43-1.6.43-4.94.43-4.94,0,0,0-3.34-.43-4.94h0Zm-11.87,8.01v-6.15l5.32,3.08-5.32,3.07Z"></path></svg>
            </Link>
            <Link id="social-link" to="https://github.com/RYRY1002">
              <svg className="fill-foreground w-[1.4em] h-[1.4em] inline-block"><path className="text-foreground" d="m10.25,0c5.66,0,10.25,4.59,10.25,10.25,0,4.4-2.81,8.32-6.98,9.73-.51.1-.7-.22-.7-.49,0-.35.01-1.45.01-2.82,0-.96-.32-1.58-.69-1.9,2.28-.26,4.68-1.13,4.68-5.06,0-1.13-.4-2.04-1.05-2.76.1-.26.46-1.31-.1-2.72,0,0-.86-.28-2.82,1.05-.82-.23-1.69-.35-2.56-.35s-1.74.12-2.56.35c-1.96-1.32-2.82-1.05-2.82-1.05-.56,1.41-.21,2.46-.1,2.72-.65.72-1.05,1.64-1.05,2.76,0,3.92,2.38,4.81,4.67,5.06-.29.26-.56.7-.65,1.37-.59.27-2.06.7-2.99-.85-.19-.31-.77-1.06-1.58-1.05-.86.01-.35.49.01.68.44.24.94,1.15,1.05,1.45.21.58.87,1.68,3.45,1.2,0,.86.01,1.67.01,1.91,0,.27-.19.58-.7.49C2.82,18.59,0,14.67,0,10.25,0,4.59,4.58,0,10.25,0Z"></path></svg>
            </Link>
            <Link id="social-link" to="https://www.linkedin.com/in/ryry1002/">
              <svg className="fill-foreground w-[1.4em] h-[1.4em] inline-block"><path className="text-foreground" d="m17.18,16.77h-2.92v-4.57c0-1.09-.02-2.49-1.52-2.49s-1.75,1.19-1.75,2.41v4.65h-2.92V7.38h2.8v1.28h.04c.57-.98,1.63-1.56,2.76-1.52,2.96,0,3.5,1.94,3.5,4.47v5.15ZM4.79,6.09c-.93,0-1.69-.76-1.69-1.69s.76-1.69,1.69-1.69c.93,0,1.69.76,1.69,1.69s-.76,1.69-1.69,1.69h0m1.46,10.68h-2.92V7.38h2.92v9.39ZM18.63,0H1.86C1.07,0,.42.63.41,1.42v16.84c0,.79.66,1.43,1.45,1.42h16.77c.79,0,1.45-.63,1.46-1.42V1.42c-.01-.79-.66-1.43-1.46-1.42"></path></svg>
            </Link>
            <Link id="social-link" to="https://discord.com/users/314645664032358400">
              <svg className="fill-foreground w-[1.4em] h-[1.4em] inline-block"><path className="text-foreground" d="m16.67,3.71c-1.29-.59-2.66-1.01-4.06-1.25-.19.34-.37.7-.52,1.06-1.49-.23-3.01-.23-4.51,0-.15-.36-.33-.71-.52-1.06-1.4.24-2.77.66-4.06,1.25C.43,7.52-.26,11.22.08,14.88H.08c1.5,1.11,3.19,1.96,4.98,2.5.4-.54.76-1.12,1.07-1.72-.58-.22-1.14-.49-1.68-.8.14-.1.28-.21.41-.31,3.15,1.48,6.8,1.48,9.96,0,.13.11.27.22.41.31-.54.32-1.1.59-1.68.8.31.6.66,1.18,1.07,1.72,1.79-.54,3.48-1.39,4.98-2.5h0c.41-4.24-.7-7.91-2.93-11.17ZM6.57,12.63c-.97,0-1.77-.88-1.77-1.96s.77-1.97,1.77-1.97,1.79.89,1.77,1.97-.78,1.96-1.77,1.96Zm6.54,0c-.97,0-1.77-.88-1.77-1.96s.77-1.97,1.77-1.97,1.79.89,1.77,1.97-.78,1.96-1.77,1.96Z"></path></svg>
            </Link>
            <Link id="social-link" to="https://steamcommunity.com/id/ryry1002/" className="">
              <svg className="fill-foreground w-[1.4em] h-[1.4em] inline-block"><path className="text-foreground" d="M 10.3863 0.601 C 4.99252 0.601 0.57388 4.75991 0.154 10.0452 L 5.65728 12.3206 C 6.12359 12.0017 6.68691 11.8148 7.29295 11.8148 C 7.34726 11.8148 7.40134 11.8167 7.45496 11.8197 L 9.90231 8.2724 C 9.90231 8.25546 9.90207 8.23898 9.90207 8.22227 C 9.90207 6.08711 11.6389 4.35001 13.7743 4.35001 C 15.9095 4.35001 17.6464 6.08711 17.6464 8.22227 C 17.6464 10.3574 15.9095 12.0948 13.7743 12.0948 C 13.7449 12.0948 13.7156 12.0941 13.6864 12.0934 L 10.1959 14.5839 C 10.1978 14.6291 10.1994 14.6753 10.1994 14.7213 C 10.1994 16.3242 8.89565 17.6277 7.29295 17.6277 C 5.88614 17.6277 4.70982 16.6237 4.44336 15.2939 L 0.50773 13.6668 C 1.7263 17.9766 5.68583 21.1363 10.3863 21.1363 C 16.0571 21.1363 20.654 16.5392 20.654 10.869 C 20.654 5.1979 16.0569 0.601 10.3863 0.601"></path><path className="text-foreground" d="M 6.58827 16.1806 L 5.32699 15.6595 C 5.55051 16.1248 5.9372 16.5146 6.45063 16.7286 C 7.56057 17.1909 8.84018 16.6643 9.30277 15.5534 C 9.52675 15.0163 9.52815 14.4233 9.30602 13.8848 C 9.08436 13.3461 8.6661 12.9259 8.1283 12.7017 C 7.59469 12.4796 7.02301 12.4877 6.52072 12.6773 L 7.82355 13.2161 C 8.64219 13.5573 9.02935 14.4973 8.68815 15.316 C 8.34765 16.1348 7.40691 16.522 6.58827 16.1806"></path><path className="text-foreground" d="M 16.3542 8.22227 C 16.3542 6.79968 15.1969 5.64215 13.7741 5.64215 C 12.3515 5.64215 11.194 6.79968 11.194 8.22227 C 11.194 9.64509 12.3515 10.8021 13.7741 10.8021 C 15.1969 10.8019 16.3542 9.64486 16.3542 8.22227 M 11.8402 8.21786 C 11.8402 7.14738 12.708 6.27975 13.7785 6.27975 C 14.849 6.27975 15.7168 7.14738 15.7168 8.21786 C 15.7168 9.28834 14.849 10.156 13.7785 10.156 C 12.708 10.156 11.8402 9.28811 11.8402 8.21786"></path></svg>
            </Link>
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