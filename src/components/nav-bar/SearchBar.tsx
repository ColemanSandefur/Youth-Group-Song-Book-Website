import React, { useRef, useState } from "react";
import "../../styles/nav-bar.scss";

export default function SearchBar(props: {
    search: (query: string) => void,
}) {
    let [songQuery, setSongQuery] = useState("");
    let songInputRef = useRef<HTMLInputElement>(null);

    let clearButton;
    if (songQuery.length > 0) {
        clearButton = (
            <span className="remove" onClick={() => {
                setSongQuery("");
                props.search("");

                if (songInputRef.current) {
                    songInputRef.current.value = "";
                }
            }}>
                &times;
            </span>
        )
    }

    return (
        <span className="Song-input">
            <input 
                ref={songInputRef} 

                onChange={(event) => {props.search(event.target.value); setSongQuery(event.target.value)}} 
                placeholder={"Search for a song..."} 
            />
            {clearButton}
        </span>
    )
}

