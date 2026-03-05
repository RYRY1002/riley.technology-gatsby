import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"

import { MDXProvider } from "@mdx-js/react";

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
import { Separator } from "@/components/ui/separator";

import ThemeProvider from "@/components/ui/theme-provider";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MaterialSymbol } from "gatsby-plugin-material-symbols";

import Footer from "@/components/footer";

require("katex/dist/katex.min.css")

import { InlineCarousel, MarkdownImage, AllAccessPass, MarkdownVideoPlayer } from "@/components/ui/markdown";

import { VideoPlayer } from "@/components/ui/player";

const mdxImage = props => (
  <MarkdownImage image={{src: props.src, alt: props.alt}} className={props.title} {...props}/>
)
const mdxComponents = {
  InlineCarousel,
  AllAccessPass,
  img: mdxImage,
  MarkdownVideoPlayer,
  VideoPlayer
}

export default function BlogPost({ data: { mdx }, children }) {
  const { frontmatter } = mdx;

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div vaul-drawer-wrapper="">
        <main className="relative z-1 bg-background">
          <Link to="" className="flex flex-row mt-6 mx-[15%] max-md:mx-6">
            <MaterialSymbol symbol="arrow_back" size={24} weight={300} />
            Head home
          </Link>
          <div id="hero" className="relative mt-6 mx-[12.5%] max-md:mx-0 mb-14 rounded-xl">
            {frontmatter.images?.hero && (
              <Dialog open={isFullscreenHeroCarouselOpen} onOpenChange={handleFullscreenHeroCarouselOpenChange}>
                <Carousel setApi={setApi}>
                  <CarouselContent className="rounded-xl">
                    {frontmatter.images.hero.map((image, index) => (
                      <CarouselItem key={index} className="h-[60vmin] max-md:basis-[85%] basis-[45%] cursor-grab active:cursor-grabbing select-none relative">
                        <GatsbyImage image={getImage(image.src)} alt={image.alt} className="object-cover h-[60vmin] rounded-xl"/>
                        <div className="absolute w-full h-full bottom-0 object-cover rounded-xl">
                          <div id="hero-overlay" className="absolute w-full h-full bottom-0 object-cover rounded-xl" style={{background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.93) 100%)"}}/>
                          <p className="absolute left-8 top-5 w-max max-w-[75%] max-md:max-w-[85%] drop-shadow-sm max-md:text-sm">{image.alt}</p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="absolute size-8 rounded-full right-6 top-5">
                      <MaterialSymbol symbol="open_in_full" size={18} weight={300} />
                    </Button>
                  </DialogTrigger>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <DialogContent className="min-w-full h-screen max-w-none rounded-none border-none p-0">
                  <Carousel setApi={setFullscreenApi}>
                    <CarouselContent>
                      {frontmatter.images.hero.map((image, index) => (
                        <CarouselItem key={index} className="grid 2xl:grid-cols-[1fr_16%] xl:grid-cols-[1fr_26%] max-md:grid-rows-[1fr_15%] h-screen cursor-grab active:cursor-grabbing select-none">
                          <GatsbyImage image={getImage(image.src)} alt={image.alt} className="object-cover h-full" objectFit="contain"/>
                          <div id="fullscreen-hero-carousel-alt" className="flex flex-col justify-between p-10 max-md:p-0 border-l max-md:border-0 cursor-auto select-auto prose">
                            <div>
                              <p className="not-prose"><strong>{index + 1}</strong> of <strong>{frontmatter.images.hero.length}</strong></p>
                              <Separator orientation="horizontal" className="mt-2"/>
                              <p className="mb-0">{image.alt}</p>
                            </div>
                            <div className="max-md:hidden">
                              <a href={"/" + image.src.relativePath} className="no-underline!">Download the original</a>
                              <p className="m-0! text-xs">
                                {image.src.childImageSharp.original.width}x{image.src.childImageSharp.original.height} {image.src.prettySize}
                              </p>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute h-8 w-8 rounded-full left-6 top-1/2 -translate-y-1/2 max-md:hidden" />
                    <CarouselNext className="absolute h-8 w-8 rounded-full right-6 top-1/2 -translate-y-1/2 max-md:hidden" />
                  </Carousel>
                </DialogContent>
              </Dialog>
            )}
            <div id="hero-text" className="absolute bottom-7 mx-10! max-md:mx-5! my-0! prose">
              <h1 className="m-0! max-md:text-2xl">{frontmatter.title}</h1>
              <h4 className="m-0! font-normal max-md:text-base">{frontmatter.date}</h4>
            </div>
          </div>
          <div className="relative pb-8 prose">
            <MDXProvider components={mdxComponents}>
              {children}
            </MDXProvider>
          </div>
          <div id="footer-gradient-deco" className="absolute -bottom-[2vw] z-0 h-[2vw] w-full bg-linear-to-b from-background to-[#ffffff00]"/>
        </main>
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export const Head = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title} - Riley Cunningham</title>
  </>
)

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: {eq: $id}) {
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        slug
        title
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
            original {
              width
              height
            }
          }
          relativePath
          prettySize
        }
        videoLooping {
          publicURL
        }
        images {
          hero {
            src {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, transformOptions: {fit: CONTAIN})
                original {
                  width
                  height
                }
              }
              relativePath
              prettySize
            }
            alt
          }
        }
      }
      remoteImages {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
          original {
            width
            height
          }
        }
        relativePath
        prettySize
      }
    }
  }
`