import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import SongDisplay from "../components/song-display/SongDisplay"
import "../styles/index.scss"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <SongDisplay />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => (<>
  <title>Youth Group Songs</title>
  <meta name="keywords" content="Youth Group Songs, YG Songs, yg-songs, church songs" />
  <meta name="description" content="A collection of 200+ popular youth group songs" />
</>)
