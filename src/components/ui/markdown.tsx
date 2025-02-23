import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
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

import { useStaticQuery, graphql } from "gatsby"
import {
  GatsbyImage,
  getImage,
  GatsbyImageProps,
  StaticImage
} from "gatsby-plugin-image";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/outlined";

export function InlineCarousel(
  {
    images,
    alt,
    startIndex = 0,
    ...props
  }: {
    images: [
      {
        src?: string,
        id?: string,
        alt: string
      }
    ] | [string],
    alt?: string
    startIndex?: number,
  }
) {
  const perImageAlt = alt ? false : true;
  images.forEach((image, index) => {
    if (!image.src && !image.id && !image) {
      throw new Error(`Image ${index} is missing a src & id property.`);
    }
  });
  if (images.length <= 1) {
    console.warn("Inline carousels should have more than one image in them. Use a MarkdownImage if you want one image.");
  };

  const data = useStaticQuery(graphql`
    query MarkdownAllImages {
      allImageSharp {
        nodes {
          id
          gatsbyImageData(layout: FULL_WIDTH, transformOptions: {fit: CONTAIN})
          original {
            width
            height
          }
          parent {
            ... on File {
              relativePath
              url
              prettySize
            }
          }
        }
      }
    }
  `)

  let queriedImages = [];

  images.forEach((image) => {
    data.allImageSharp.nodes.forEach((node) => {
      if (
        (node.parent.relativePath || node.parent.url) === (image.src || image)
        || node.id === image.id
      ) {
        queriedImages.push({
          src: node.gatsbyImageData,
          original: node.original,
          prettySize: node.parent.prettySize,
          relativePath: node.parent.relativePath,
          alt: image.alt
        });
      };
    });
  });

  const [api, setApi] = React.useState<CarouselApi>();
  const [fullscreenApi, setFullscreenApi] = React.useState<CarouselApi>();
  const [synedHeroCarouselSlide, setSynedHeroCarouselSlide] = React.useState(0);
  const [isFullscreenHeroCarouselOpen, setIsFullscreenHeroCarouselOpen] = React.useState(false);

  const handleFullscreenHeroCarouselOpenChange = (open: boolean) => {
    setIsFullscreenHeroCarouselOpen(open);
    if (open) {
      if (fullscreenApi) {
        fullscreenApi.scrollTo(api.selectedScrollSnap(), true);
        setSynedHeroCarouselSlide(fullscreenApi.selectedScrollSnap());
      }
    } else {
      //api.scrollTo(fullscreenApi.selectedScrollSnap(), true);
      api.scrollTo(synedHeroCarouselSlide, true);
    }
  };

  React.useEffect(() => {
    if (!api || !fullscreenApi) return;
    fullscreenApi.on("select", () => {
      if (isFullscreenHeroCarouselOpen) setSynedHeroCarouselSlide(fullscreenApi.selectedScrollSnap());
    })
    fullscreenApi.on("init", () => {
      fullscreenApi.scrollTo(api.selectedScrollSnap(), true);
    })
  }, [api, fullscreenApi, isFullscreenHeroCarouselOpen]);

  return (
    <Dialog open={isFullscreenHeroCarouselOpen} onOpenChange={handleFullscreenHeroCarouselOpenChange}>
      <Carousel setApi={setApi} className="2xl:w-[300%] lg:w-[200%] w-screen lg:max-w-[75vw] left-1/2 -translate-x-1/2" opts={{startIndex: startIndex}}>
        <CarouselContent>
          {queriedImages.map((image, index) => (
            <CarouselItem key={index} className="h-[60vmin] md:!basis-2/3 childnum-2:basis-1/2 childnum-3:basis-[45%] cursor-grab active:cursor-grabbing select-none pl-4">
              <GatsbyImage image={getImage(image.src)} alt={image.alt} className="object-cover h-[60vmin] rounded-xl"/>
              {perImageAlt && (
                <div className="absolute md:w-[calc(66.666667%-1rem)] lg:w-[calc(45%-1rem)] h-full bottom-0 object-cover rounded-xl">
                  <p className="absolute !m-0 left-8 top-5 w-[85%] drop-shadow">{image.alt}</p>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {!perImageAlt && (
          <div className="absolute left-6 top-5">
            <p className="!m-0 drop-shadow">{alt}</p>
          </div>
        )}
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="absolute h-8 w-8 rounded-full right-6 top-5">
            <MaterialSymbol icon="open_in_full" weight={300} grade={-25} size={16}/>
          </Button>
        </DialogTrigger>
        <CarouselPrevious>
          <MaterialSymbol icon="arrow_back" weight={300} grade={-25} size={16}/>
        </CarouselPrevious>
        <CarouselNext>
          <MaterialSymbol icon="arrow_forward" weight={300} grade={-25} size={16}/>
        </CarouselNext> 
      </Carousel>
      <DialogContent className="min-w-full h-screen max-w-none rounded-none border-none p-0">
        <Carousel setApi={setFullscreenApi}>
          <CarouselContent>
            {queriedImages.map((image, index) => (
              <CarouselItem key={index} className="grid 2xl:grid-cols-[1fr_16%] xl:grid-cols-[1fr_26%] h-screen cursor-grab active:cursor-grabbing select-none">
                <GatsbyImage image={getImage(image.src)} alt={image.alt} className="object-cover h-full" objectFit="contain"/>
                <div id="fullscreen-hero-carousel-alt" className="flex flex-col justify-between p-10 border-l cursor-auto select-auto prose-sm !prose-neutral lg:prose dark:!prose-invert link-styling">
                  <div>
                    <p className="not-prose"><strong>{index + 1}</strong> of <strong>{queriedImages.length}</strong></p>
                    <Separator orientation="horizontal" className="mt-2"/>
                    <p>{perImageAlt ? image.alt : alt}</p>
                  </div>
                  <div>
                    <a href={"/" + image.relativePath} className="!no-underline">Download the original</a>
                    <p className="!m-0 text-xs">
                      {image.original.width}x{image.original.height} {image.prettySize}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute h-8 w-8 rounded-full left-6 top-1/2 -translate-y-1/2">
            <MaterialSymbol icon="arrow_back" weight={300} grade={-25} size={16}/>
          </CarouselPrevious>
          <CarouselNext className="absolute h-8 w-8 rounded-full right-6 top-1/2 -translate-y-1/2">
            <MaterialSymbol icon="arrow_forward" weight={300} grade={-25} size={16}/>
          </CarouselNext>
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}

export function MarkdownImage(
  {
    image,
    className,
    ...props
  }: {
    image:
      {
        src?: string,
        id?: string,
        alt: string
      },
    className: string
  }
) {
  if (!image.src && !image.id) {
    throw new Error(`Image is missing a src & id property.`);
  }

  const data = useStaticQuery(graphql`
    query MarkdownAllImages {
      allImageSharp {
        nodes {
          id
          gatsbyImageData(layout: FULL_WIDTH, transformOptions: {fit: CONTAIN})
          original {
            width
            height
          }
          parent {
            ... on File {
              relativePath
              url
              prettySize
            }
          }
        }
      }
    }
  `)

  let queriedImage: {
    src: any,
    original: {
      src: string,
      width: number,
      height: number
    },
    prettySize: string,
    relativePath: string,
    alt: string
  } = undefined;

  data.allImageSharp.nodes.forEach((node) => {
    if (
      (node.parent.relativePath === image.src) || (node.parent.url === image.src)
      || node.id === image.id
    ) {
      queriedImage = {
        src: node.gatsbyImageData,
        original: node.original,
        prettySize: node.parent.prettySize,
        relativePath: node.parent.relativePath,
        alt: image.alt
      };
    };
  });

  return (
    <Dialog>
      <div className="relative 2xl:w-[300%] lg:w-[200%] w-screen lg:max-w-[75vw] left-1/2 -translate-x-1/2 h-[50vmin] rounded-xl">
        <GatsbyImage image={getImage(queriedImage.src)} alt={queriedImage.alt} className={`object-cover h-[50vmin] rounded-xl ${className}`}/>
        <p className="absolute !m-0 left-8 top-5 w-max max-w-[75%] drop-shadow">{queriedImage.alt}</p>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="absolute h-8 w-8 rounded-full right-6 top-5">
            <MaterialSymbol icon="open_in_full" weight={300} grade={-25} size={16}/>
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="min-w-full h-screen max-w-none rounded-none border-none p-0">
        <div className="grid 2xl:grid-cols-[1fr_16%] xl:grid-cols-[1fr_26%]">
          <GatsbyImage image={getImage(queriedImage.src)} alt={queriedImage.alt} className={`object-cover h-full ${className}`} objectFit="contain"/>
          <div id="fullscreen-hero-carousel-alt" className="flex flex-col justify-between p-10 border-l cursor-auto select-auto prose-sm !prose-neutral lg:prose dark:!prose-invert link-styling">
            <div>
              <p>{queriedImage.alt}</p>
            </div>
            <div>
              <a href={"/" + queriedImage.relativePath} className="!no-underline">Download the original</a>
              <p className="!m-0 text-xs">
                {queriedImage.original.width}x{queriedImage.original.height} {queriedImage.prettySize}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

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
          <h1 className="!m-0">{readMore ? readMore : "Read more about" + title}</h1>
          <MaterialSymbol icon="open_in_new" weight={300} grade={200} size={25} className="ml-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[85vw]">
        <ScrollArea className="h-[85vh] w-full">
          <div className="mx-auto prose-sm !prose-neutral lg:prose dark:!prose-invert link-styling">
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}