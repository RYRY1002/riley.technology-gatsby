"use client"

import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from "@/components/ui/button";

export function AAPtest({ title, subtitle, image, children }: { title?: string, subtitle?: string, image?: File, children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  let isDesktop = false;
  if (typeof window != "undefined") {
    isDesktop = window.innerWidth > 768;
  }

  let gatsbyImageData;
  {
    const data = useStaticQuery(graphql`
      query AAP {
        allImageSharp {
          nodes {
            id
            parent {
              ... on File {
                relativePath
              }
            }
            gatsbyImageData(
              layout: FULL_WIDTH, 
              blurredOptions: {width: 48},
              aspectRatio: 1.6313786369)
          }
        }
      }
    `)
    const imageSharp = data.allImageSharp.nodes.find(n => n.parent.relativePath === image);
    gatsbyImageData = imageSharp.gatsbyImageData;
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={buttonVariants({ variant: "outline" })}>Open</DialogTrigger>
        <DialogContent className="p-0! min-w-[85vw] min-h-[85vh]">
          <ScrollArea className="rounded-[var(--radius)] h-[85vh]">
            {(title || subtitle || image) && 
              <DialogHeader className="relative">
                {image &&
                  <>
                    <GatsbyImage image={gatsbyImageData} alt={title ? title : "Hero image"} className="relative w-full h-72 object-cover rounded-t-[var(--radius)]"/>
                    <div id="aap-hero-overlay" className="absolute w-full h-full object-cover rounded-t-[var(--radius)]" style={{background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.93) 100%)"}}/>
                  </>
                }
                {(title || subtitle) && 
                  <div className="absolute bottom-5 left-6">
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
                  </div>
                }
              </DialogHeader>
            }
            {children && 
              <div className="relative mx-[12.5%] lg:mx-auto prose-sm prose-neutral! lg:prose dark:prose-invert! link-styling">
                {children}
              </div>
            }
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }

  // If not desktop
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className={buttonVariants({ variant: "outline" })}>Open</DrawerTrigger>
      <DrawerContent className="p-0! min-w-[85vw] min-h-[85vh]">
        {(title || subtitle || image) && 
          <DrawerHeader className="relative p-0! -translate-y-6">
            {image &&
              <>
                <GatsbyImage image={gatsbyImageData} alt={title ? title : "Hero image"} className="relative w-full h-72 object-cover rounded-t-[var(--radius)]"/>
                <div id="aap-hero-overlay" className="absolute w-full h-full object-cover rounded-t-[var(--radius)]" style={{background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.93) 100%)"}}/>
              </>
            }
            {(title || subtitle) && 
              <div className="absolute bottom-5 left-6">
                {title && <DrawerTitle>{title}</DrawerTitle>}
                {subtitle && <DrawerDescription>{subtitle}</DrawerDescription>}
              </div>
            }
          </DrawerHeader>
        }
        {children && 
          <div className="relative mx-[12.5%] lg:mx-auto prose-sm prose-neutral! lg:prose dark:prose-invert! link-styling">
            {children}
          </div>
        }
      </DrawerContent>
    </Drawer>
  )
}