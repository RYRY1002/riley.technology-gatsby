import * as React from "react";

import { useStaticQuery, graphql } from "gatsby"

import { VideoPlayer } from "@/components/ui/player";

export function MarkdownVideoPlayer({ video }: { video: string }) {
  const data = useStaticQuery(graphql`
    query MarkdownAllVideoMetadata {
      allVideoMetadata(sort: {date: DESC}) {
        nodes {
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
        }
      }
    }
  `)

  let queriedVideo = undefined;

  data.allVideoMetadata.nodes.forEach((node) => {
    if (node.this.relativeDirectory === video) {
      queriedVideo = node;
    }
  });

  return (
    <VideoPlayer preferNativeHLS viewType="video"
      associatedPost={queriedVideo.associatedPost?.path}
      title={queriedVideo.title as string}
      description={queriedVideo.description as string}
      date={queriedVideo.date as string}
      src={queriedVideo.src}
      download={{url: queriedVideo.download.url.relativePath as string, filename: queriedVideo.download.filename as string, size: queriedVideo.download.url.prettySize as string}}
      poster={"/" + queriedVideo.poster.relativePath}
      thumbnails={"/" + queriedVideo.thumbnails.relativePath}
      textTracks={queriedVideo.textTracks?.map((track) => ({
        src: "/" + track.src.relativePath,
        label: track.label,
        language: track.language,
        kind: track.kind,
        type: track.type,
        default: track.default
      }))}

      this={queriedVideo.this.relativeDirectory}
      id={queriedVideo.id}
    />
  )
}