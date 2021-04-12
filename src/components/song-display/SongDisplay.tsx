import React, { useState, useEffect, createRef } from "react";
import "../../stylesheets/song-display.scss";
import Song from "./Song";
import NavBar from "../nav-bar/NavBar";
import JSONSongs from "../../songs.json";
import TableOfContents from "../nav-bar/TableOfContents";

// all the songs that we have
// object is the HTML object that corresponds to the song
// reference is the React reference to the DOM object
let songs: {title: string, lyrics: string[], object?: JSX.Element, reference?: React.RefObject<HTMLSpanElement>}[] = JSONSongs;

export const scrollTo = (ref?: React.RefObject<HTMLSpanElement>) => {
    if (!ref?.current) {
        return;
    }

    let relative = document.getElementsByClassName("All-songs")[0].children[0]

    let offset = 10;

    //add nav-bar's height to the offset if it exists (prevents nav-bar from covering title of song)
    if (document.getElementsByClassName("Nav-bar").length !== 0) {
        offset += document.getElementsByClassName("Nav-bar")[0].clientHeight;
    }

    let bodyRect = relative.getBoundingClientRect().top;
    let elementRect = ref.current.getBoundingClientRect().top;
    let elementPos = elementRect - bodyRect;
    let offsetPos = elementPos - offset;

    console.log(bodyRect, elementRect, elementPos, offsetPos);

    document.getElementsByClassName("All-songs")[0]?.scrollTo({
        top: offsetPos,
        behavior: "smooth" //either "smooth" (scrolls) or "auto" (jumps)
    });
}

// Will display the songs
export default function SongDisplay(props:{}) {
    // keep track of the references to the songs
    // eslint-disable-next-line
    const [songRefs, setSongRefs] = useState<React.RefObject<HTMLSpanElement>[]>()

    // keep track of the song objects to display
    const [songObjects, setSongObjects] = useState<JSX.Element[]>();

    // called on page load
    useEffect(() => {
        // create an array of references the same size as songs
        let refs: React.RefObject<HTMLSpanElement>[] = songs.map(() => {return createRef()})

        // initialize the songs for displaying
        setSongObjects(songs.map((song, index) => {
            song.reference = refs[index];
            return song.object = <span ref={refs[index]} key={song.title}><Song title={song.title} lyrics={song.lyrics} id={index + 1}></Song></span>
        }));
        
        // save refs to a state
        setSongRefs(refs);
    }, []);

    const searchForElement = (query: string) => {
        //will test if query is a number
        var reg = new RegExp(/^\d+$/);
        
        if (reg.test(query)) {
            //if is number

            let num = Number(query);
            num--;
            console.log(num);

            if (num < songs.length) {
                let song = songs[num];

                if (song.reference) {
                    scrollTo(song.reference);
                    return;
                }
            }
        } else {
            //if is not a number
            let queryLower = query.toLowerCase();
            let song;
            for (let i = 0; i < songs.length; i++) {
                song = songs[i];
                
                if (song.title.toLowerCase().includes(queryLower) && song.reference) {
                    scrollTo(song.reference);
                    return;
                }
            }
        }
    }

    return (
        <div>
            {/* <TableOfContents scrollTo={scrollTo} songs={songs} /> */}
            <NavBar search={searchForElement} songs={songs}/>
            <div className="All-songs">
                <span></span>
                {songObjects}
            </div>
        </div>
    );
}