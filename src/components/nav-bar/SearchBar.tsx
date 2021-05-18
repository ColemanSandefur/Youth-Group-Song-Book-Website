import { useRef, useState } from "react";

export default function SearchBar(props: {
    search: (query: string) => void,
}) {
    let [songQuery, setSongQuery] = useState("");
    let songInputRef = useRef<HTMLInputElement>(null);

    return (
        <span className="Song-input">
            <input 
                ref={songInputRef} 

                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        props.search(songQuery);
                    }
                }} 

                onChange={(event) => {setSongQuery(event.target.value)}} 
                placeholder={"search song # or title"} 
            />
        </span>
    )
}

