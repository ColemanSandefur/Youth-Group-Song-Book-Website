import { useRef, useState } from "react";
import "../../stylesheets/nav-bar.scss";

export default function NavBar(props:{search: (query: string) => void}) {
    let [songQuery, setSongQuery] = useState("");
    let songInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="Nav-bar">
            <span>songs</span>
            <span className="Song-input"><input ref={songInputRef} onKeyPress={(event) => {
                if (event.key === "Enter" && songQuery) {
                    props.search(songQuery);
                }
            }} onChange={(event) => {setSongQuery(event.target.value)}} placeholder={"search song # or title"}></input></span>
        </div>
    )
}