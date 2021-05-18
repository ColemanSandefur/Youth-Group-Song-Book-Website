import { useEffect, useState } from "react";
import {scrollTo} from "../song-display/SongDisplay";
import SearchBar from "./SearchBar";

// const formatSongs = (props: {
//     songs: {title: string, reference?: React.RefObject<HTMLSpanElement>}[]
//     setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
//     isVisible: boolean
// }) => {
//     //format songs into an object of names and the JSX elements for sorting
//     let formatted = props.songs.map((song, index) => {
//         return ({
//             name: song.title,
//             dom: <p onClick={() => {
//                 scrollTo(song.reference);
//                 props.setVisibility(false);
//             }} key={index + song.title}><span>{index + 1 + ":\t"}</span> {song.title}</p>
//         });
//     });
    
//     //sort alphabetically
//     formatted.sort((a, b) => (a.name > b.name)? 1 : -1);

//     //insert section headers
//     let startingChar = " ";
//     for (let i = 0; i < formatted.length; i++) {
//         if (startingChar.toLowerCase() !== formatted[i].name[0].toLowerCase()) {
//             startingChar = formatted[i].name[0].toLowerCase();

//             formatted.splice(i, 0, {
//                 "name": startingChar, 
//                 dom: <h1 key={startingChar}><span>{startingChar.toUpperCase()}</span></h1>
//             })

//             i++;
//         }
//     }

//     //convert into just JSX elements
//     let output = formatted.map((song) =>{
//         return song.dom;
//     });

//     return output;
// }

const matches = (search: string, song: {title: string, lyrics: string[], number: number}) => {
    search = search.toLowerCase();
    return song.title.toLowerCase().includes(search) || song.number + 1 === Number.parseInt(search)
}

const search = (search: string, songs: {title: string, lyrics: string[]}[]) => {
    let output = songs.slice().map((value, index) => {
        return {...value, number: index};
    });

    for (let i = 0; i < output.length; i++) {
        if (!matches(search, output[i])) {
            output.splice(i, 1);
            i--;
        }
    }

    return output;
}

const formatSongs = (
    songs: {title: string, number: number}[],
    onItemPress: (item: {title: string}, index: number) => void
) => {

    //create elements for each song given
    let formatted = songs.map((song) => {
        return ({
            name: song.title,
            dom: (
                <p onClick={() => {onItemPress({title: song.title}, song.number)}} key={song.title + song.number}>
                    <span>{song.number + 1 + ":\t"}</span> {song.title}
                </p>
            )
        });
    });

    //sort the names to be in order
    formatted.sort((a, b) => (a.name > b.name) ? 1 : -1);

    let startingChar = " ";
    for (let i = 0; i < formatted.length; i++) {
        if (startingChar.toLowerCase() !== formatted[i].name[0].toLowerCase()) {
            startingChar = formatted[i].name[0].toLowerCase();

            formatted.splice(i, 0, {
                "name": startingChar,
                dom: (
                    <h1 key={startingChar}><span>{startingChar.toUpperCase()}</span></h1>
                )
            });
        }
    }

    let output = formatted.map((song) => {
        return song.dom;
    });

    return output;
}

export default function TableOfContents(props: {
    songs: {title: string, lyrics: string[], reference?: React.RefObject<HTMLSpanElement>}[],
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible: boolean,
}) {
    
    let [output, setOutput] = useState<JSX.Element[]>([]);
    let [songResults, setSongResults] = useState<{title: string, lyrics: string[], number: number}[]>(props.songs.map((value, index) => {return {...value, number: index}}));

    const onItemPress = (item: {title: string}, index: number) => {
        scrollTo(props.songs[index].reference)
    }

    const updateSearch = (query: string) => {
        setSongResults(search(query, props.songs));
    }

    useEffect(() => {
        let songs = songResults.map((value) => {return {title: value.title, number: value.number}});

        setOutput(formatSongs(songs, onItemPress));

        //eslint-disable-next-line
    }, [props.songs, songResults])

    return (
        <div className="Table-of-contents custom-scrollbar" style={{
            visibility: props.isVisible?"visible":"collapse"
        }} >
            
            <div className="content">
                <SearchBar search={updateSearch}/>
                {output}
            </div>
        </div>
    )
}