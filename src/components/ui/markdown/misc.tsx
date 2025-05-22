import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { MaterialSymbol } from "gatsby-plugin-material-symbols";

export function AllAccessPass(
  {
    title,
    subtitle,
    readMore,
    bgImage,
    children
  }: {
    title?: string,
    subtitle?: string,
    readMore?: string,
    bgImage?: string,
    children: React.ReactNode
  }
) {
  return (
    <Dialog>
      <DialogTrigger className="w-full h-fit" asChild>
        <Button variant="outline" className="h-[6em]">
          <h1 className="m-0!">{readMore ? readMore : "Read more about" + title}</h1>
          <MaterialSymbol symbol="open_in_new" weight={300} grade={200} size={25} className="ml-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[85vw]">
        <ScrollArea className="h-[85vh] w-full">
          <div className="prose">
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}