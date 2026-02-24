import * as React from "react";
import { Link, PageProps, graphql } from "gatsby";

import ThemeProvider from "@/components/ui/theme-provider";
import ThemeToggleButton from "@/components/theme-toggle-button";

import { cn } from "@/lib/utils"

import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast
} from "@/components/ui/pagination"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";

import { remapValue } from "@/lib/utils";

import Footer from "@/components/footer";
import { MaterialSymbol } from "gatsby-plugin-material-symbols";

import { getTagline } from "@/lib/taglines";

export const BlogIndex: React.FC<PageProps> = ({ data, pageContext }: any) => {
  const posts = data.allMdx.edges;
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/" : "/" + (currentPage - 1).toString();
  const nextPage = "/" + (currentPage + 1).toString();

  // This is to prevent builds from messing up, nodejs doesn't have access to window as it doesn't load it in a browser
  // It seems a bit out of place for JS, checks like this are usually reserved for well made programs in good languages. This is necessary for it to build though.
  if (typeof window !== "undefined") {
    import("jquery").then((jQuery) => {
      const $ = jQuery.default;
      {
        // Pauses videos not currently in viewport for performance
        require("is-in-viewport");
        $(window).on("scroll", function() {
          $("video").each(function() {
            if ($(this).is(":in-viewport")) {
              $(this).get(0).play();
            } else {
              $(this).get(0).pause();
            }
          })
        })
      }
      {
        // Makes the socials sticky after the hero text is hidden
        $(window).on("scroll load", function() {
          let currentScroll = $(window).scrollTop();
          let socialTop = $("#tagline").offset().top;
          let socialBottom = socialTop + $("#tagline").height();
          let scrollPercent = currentScroll / socialBottom;

          if ( currentScroll >= socialBottom ) {
            $("#socials").addClass("sticky");
            $("#socials").removeClass("relative");
            $("#socials").addClass("top-5");
            $("#tagline").css("margin-bottom", $("#socials").height() + "!important");
          } else {
            $("#socials").removeClass("sticky");
            $("#socials").addClass("relative");
            $("#socials").removeClass("top-5");
            $("#tagline").css("margin-bottom", 0 + "!important");
          }
        });
      }
      {
        $(window).on("scroll load", function() {
          let currentScroll = $(window).scrollTop();
          let arrow = $("#hero").height() - $("#socials").height() - $(window).height() * 0.25;

          function lerp(start, end, time) {
            return start + (end - start) * time;
          }

          if (currentScroll <= arrow) {
            $("#rotating-arrow").css("rotate", lerp(0, 90, Math.min(...[currentScroll / arrow, 1])) + "deg");
          } else {
            $("#rotating-arrow").css("rotate");
          }
        });
      }
      {
        $(window).on("scroll load", function() {
          let viewportHeight = $(window).height();
          let viewportWidth = $(window).width();
          let currentScroll = $(window).scrollTop();
          currentScroll = currentScroll + viewportHeight - (viewportWidth * 0.03);
          let mainHeight = $("main").height();

          if (currentScroll >= mainHeight) {
            $("#background-pics").addClass("absolute!");
            $("#background-pics").addClass("h-screen");
            $("#background-pics").addClass("-bottom-[3vw]!");
            $("#background-pics").removeClass("fixed");
            $("#background-pics").removeClass("h-full");
            $("#background-pics").css("mask-image", "linear-gradient(rgb(255, 255, 255) 97%, rgba(255, 255, 255, 0) 100%)");
          } else {
            $("#background-pics").removeClass("absolute!");
            $("#background-pics").removeClass("h-screen");
            $("#background-pics").removeClass("-bottom-[3vw]!");
            $("#background-pics").addClass("fixed");
            $("#background-pics").addClass("h-full");
            $("#background-pics").css("mask-image", "");
          }
        });
      }
      {
        // Blurs the background video when scrolling
        $(window).on("scroll load", function() {
          let currentScroll = $(window).scrollTop();
          let heroBottom = $("#tagline").offset().top + $("#tagline").height();
  
          if (currentScroll >= heroBottom) {
            $("#background-pics").css("filter", 
            "blur(" + remapValue(currentScroll, [heroBottom, ($(document).height() - $(window).height())], [0, 20]) + "px) " + 
            "brightness(" + remapValue(currentScroll, [heroBottom, ($(document).height() - $(window).height())], [1, 0.65]) + ")");
          } else {
            $("#background-pics").css("filter", "");
          }
        });
      }
    });
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <main className="relative z-1 bg-background">
        <Carousel plugins={[Autoplay({ stopOnInteraction: false, stopOnFocusIn: false }), Fade()]} opts={{ loop: true }} id="background-pics" className="absolute -z-1 h-full w-full overflow-hidden">
          <CarouselContent className="h-full w-full">
            <CarouselItem className="fixed bottom-0 left-0 w-full *:w-full h-full *:h-full object-cover -z-1 select-none">
              <StaticImage src="../../static/images/v4/v4-1.png" alt="Hero image" placeholder="blurred"/>
            </CarouselItem>
            <CarouselItem className="fixed bottom-0 left-0 w-full *:w-full h-full *:h-full object-cover -z-1 select-none">
              <StaticImage src="../../static/images/v4/v4-14.png" alt="Hero image" placeholder="dominantColor"/>
            </CarouselItem>
            <CarouselItem className="fixed bottom-0 left-0 w-full *:w-full h-full *:h-full object-cover -z-1 select-none">
              <StaticImage src="../../static/images/v4/v4-15.png" alt="Hero image" placeholder="dominantColor"/>
            </CarouselItem>
            <CarouselItem className="fixed bottom-0 left-0 w-full *:w-full h-full *:h-full object-cover -z-1 select-none">
              <StaticImage src="../../static/images/v5-progressupdate.jpg" alt="Hero image" placeholder="dominantColor"/>
            </CarouselItem>
            <CarouselItem className="fixed bottom-0 left-0 w-full *:w-full h-full *:h-full object-cover -z-1 select-none">
              <StaticImage src="../../static/images/v4/v4-19.png" alt="Hero image" placeholder="dominantColor"/>
            </CarouselItem>
            <CarouselItem className="fixed bottom-0 left-0 w-full *:w-full h-full *:h-full object-cover -z-1 select-none">
              <StaticImage src="../../static/images/v4/v4-23.png" alt="Hero image" placeholder="dominantColor"/>
            </CarouselItem>
            <CarouselItem className="fixed bottom-0 left-0 w-full *:w-full h-full *:h-full object-cover -z-1 select-none">
              <StaticImage src="../../static/images/v4-360.jpg" alt="Hero image" placeholder="dominantColor"/>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div id="hero" className="px-20 pt-12 h-[89vh] w-full *:drop-shadow-lg">
          <h1 id="tagline" className="text-6xl font-bold mb-5 relative">{getTagline("main")}</h1>
          <div id="socials" className="relative fill-foreground flex gap-1">
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
        <div id="acticles-header" className="mx-16 -mb-4 flex flex-wrap *:drop-shadow-lg">
          <h2 className="text-4xl font-bold">Things I've made</h2>
          <MaterialSymbol symbol="arrow_outward" size={40} fill className="ml-2 select-none relative -bottom-0.5" id="rotating-arrow"/>
        </div>
        <div id="articles" className="grid grid-cols-3 grid-flow-dense auto-rows-auto justify-center content-center gap-[0.65rem] m-16">
          {posts.map(({ node }) => {
            return (
              <article id={node.id} className={cn("transition-transform duration-150 ease-in-out bg-cover bg-center min-h-[35vmin] rounded-xl relative overflow-hidden hover:scale-[1.075] hover:z-[10]", (node.frontmatter.importance >= 2 ? "col-start-1 col-span-2" : "col-start-3"), (node.frontmatter.importance >= 4 && "row-span-2"))}>
                <GatsbyImage image={getImage(node.frontmatter.image)} alt={node.frontmatter.title} className="absolute! w-full h-full pointer-events-none object-fill z-[-1]"/>
                <Link to={"/project/" + node.frontmatter.slug} className="p-8 relative w-full h-full inline-block -top-1.5 *:drop-shadow-lg">
                  <h2 className="text-3xl font-bold leading-none">{node.frontmatter.title}</h2>
                  <small className="text-sm" style={{fontStretch: 85 + "%"}}>{node.frontmatter.date}</small>
                </Link>
              </article>
            )
          })}
        </div>
        {numPages > 1 && (
          <Pagination className="mb-2">
            <PaginationContent>
            {!isFirst && (
                <PaginationItem>
                  <PaginationFirst to="/"/>
                </PaginationItem>
              )}
              {!isFirst && (
                <PaginationItem>
                  <PaginationPrevious to={prevPage}/>
                </PaginationItem>
              )}
              {Array.from({ length: numPages }, (_, i) => (
                <PaginationItem key={`pagination-number${i + 1}`}>
                  <PaginationLink to={`/${i === 0 ? "" : i + 1}`} className={i === currentPage - 1 && "bg-accent text-accent-foreground"}>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}
              {!isLast && (
                <PaginationItem>
                  <PaginationNext to={nextPage}/>
                </PaginationItem>
              )}
              {!isLast && (
                <PaginationItem>
                  <PaginationLast to={`/${numPages}`}/>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </main>
      <div id="footer-gradient-deco" className="relative z-0 h-[2vw] w-full bg-linear-to-b from-background to-[#ffffff00]" style={{maskImage: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)"}}/>
      <Footer/>
    </ThemeProvider>
  )
}

export const Head = ({}) => (
  <>
    <title>Riley Cunningham - Video game & generalist programmer, video editor</title>
  </>
)

export default BlogIndex  

export const pageQuery = graphql`
  query BlogPageQuery($limit: Int!, $skip: Int!) {
    allMdx(
        sort: {
          frontmatter: {
            date: DESC
          }
        }
        limit: $limit
        skip: $skip
      ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "DD MMM, YYYY")
            title
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                )
              }
            }
            slug
            importance
          }
          id
        }
      }
      group(
          field: {frontmatter: {tags: SELECT}}
        ) {
          fieldValue
          totalCount
        }
    }
  }
`