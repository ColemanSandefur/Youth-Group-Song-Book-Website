import { useEffect, useState } from "react";
import {scrollTo} from "../song-display/SongDisplay";
import DarkModeSwitch from "./DarkModeSwitch";

const formatSongs = (props: {
    songs: {title: string, reference?: React.RefObject<HTMLSpanElement>}[]
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible: boolean
}) => {
    //format songs into an object of names and the JSX elements for sorting
    let formatted = props.songs.map((song, index) => {
        return ({
            name: song.title,
            dom: <p onClick={() => {
                scrollTo(song.reference);
                props.setVisibility(false);
            }} key={index + song.title}><span>{index + 1 + ":\t"}</span> {song.title}</p>
        });
    });
    
    //sort alphabetically
    formatted.sort((a, b) => (a.name > b.name)? 1 : -1);

    //insert section headers
    let startingChar = " ";
    for (let i = 0; i < formatted.length; i++) {
        if (startingChar.toLowerCase() !== formatted[i].name[0].toLowerCase()) {
            startingChar = formatted[i].name[0].toLowerCase();

            formatted.splice(i, 0, {
                "name": startingChar, 
                dom: <h1 key={startingChar}><span>{startingChar.toUpperCase()}</span></h1>
            })

            i++;
        }
    }

    //convert into just JSX elements
    let output = formatted.map((song) =>{
        return song.dom;
    });

    return output;
}

export default function TableOfContents(props: {
    songs: {title: string, reference?: React.RefObject<HTMLSpanElement>}[],
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible: boolean
}) {
    
    let [output, setOutput] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setOutput(formatSongs(props));

        //eslint-disable-next-line
    }, [props.songs])

    return (
        <div className="Table-of-contents custom-scrollbar" style={{
            visibility: props.isVisible?"visible":"collapse"
        }} onClick={() => props.setVisibility(false)}>
            <div>
                <DarkModeSwitch />
                {output}
            </div>
            
        </div>
    )
}