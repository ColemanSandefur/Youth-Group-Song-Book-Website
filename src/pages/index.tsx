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

export const Head: HeadFC = () => <title>Youth Group Songs</title>
