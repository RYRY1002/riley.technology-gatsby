import * as React from "react";
import { Link, PageProps, graphql } from "gatsby";

import ThemeProvider from "@/components/ui/theme-provider";
import ThemeToggleButton from "@/components/theme-toggle-button";

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
} from "@/components/ui/pagination";

import Footer from "@/components/footer";
import { MaterialSymbol } from "gatsby-plugin-material-symbols";

import { VideoPlayer } from "@/components/ui/player";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const VideosPage: React.FC<PageProps> = ({ data, pageContext }: any) => {
  const videos = data.allVideoMetadata.edges,
  { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/" : `/${currentPage - 1}`.toString();
  const nextPage = `/${currentPage + 1}`.toString();

  return (
    <ThemeProvider>
      <main className="relative z-1 bg-background">
        <div className="grid grid-cols-3 grid-rows-5 gap-3">
          {videos.map(({ node }) => {
            return (
              <Dialog>
                <DialogTrigger overrideClassName className="relative p-0 border group rounded-lg text-left" id={node.id}>
                  <div className="flex flex-col h-full">
                    <GatsbyImage image={getImage(node.poster)} alt={node.title} className="pointer-events-none object-fill aspect-video"/>
                    <div className="relative grow overflow-hidden group/text">
                      <GatsbyImage image={getImage(node.poster)} alt={node.title} className="absolute! w-full blur-2xl scale-y-400 scale-x-110 -top-[490%] opacity-50 pointer-events-none object-fill aspect-video drop-shadow-none -z-[1] group-hover:opacity-100 transition-opacity"/>
                      <div className="px-8 pb-8 pt-6 *:drop-shadow-lg w-full h-full inline-block relative overflow-hidden">
                        <h2 className="text-3xl font-bold leading-none mb-1.5">{node.title}</h2>
                        <small className="italic text-sm bottom-full">{node.date}</small>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="min-w-[85vw] h-[85vh] aspect-video">
                  <ScrollArea className="h-full w-full">
                    <VideoPlayer preferNativeHLS viewType="video"
                      title={node.title}
                      thumbnails={node.thumbnails.relativePath}
                      poster={node.poster.relativePath}
                      textTracks={node.textTracks?.map((track) => ({
                        src: track.src.relativePath,
                        label: track.label,
                        language: track.language,
                        kind: track.kind,
                        type: track.type,
                        default: track.default
                      }))}
                      src={node.src}
                    />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </main>
      <div id="footer-gradient-deco" className="absolute -bottom-[2vw] z-0 h-[2vw] w-full bg-linear-to-b from-background to-[#ffffff00]"/>
      <Footer/>
    </ThemeProvider>
  )
}
export default VideosPage;

export const pageQuery = graphql`
  query AllVideoMetadata($limit: Int!, $skip: Int!) {
    allVideoMetadata(limit: $limit, skip: $skip, sort: {date: DESC}) {
      edges {
        node {
          title
          description
          date(formatString: "MMMM DD, YYYY")
          src
          poster {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
            relativePath
          }
          posters {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
          thumbnails {
            relativePath
          }
          textTracks {
            src {
              relativePath
            }
            label
            language
            kind
            type
            default
          }
          this {
            relativeDirectory
          }
          associatedPost {
            path
          }
          id
        }
      }
    }
  }
`