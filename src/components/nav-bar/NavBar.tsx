import { useRef, useState } from "react";
import "../../stylesheets/nav-bar.scss";
import TableOfContents from "./TableOfContents";

export default function NavBar(props:{
    search: (query: string) => void,
    songs: {title: string, reference?: React.RefObject<HTMLSpanElement>}[],
}) {
    let [songQuery, setSongQuery] = useState("");
    let [isVisible, setVisibility] = useState(false);
    let songInputRef = useRef<HTMLInputElement>(null);

    let toc;

    if (isVisible) {
        toc=<TableOfContents songs={props.songs} setVisibility={setVisibility} isVisible={isVisible}/>
    }

    return (
        <div className="Nav-bar">
            {/* Button to show the sidebar */}
            <span className={"Expand-icon"} onClick={() => setVisibility(!isVisible)}>
                <div className={isVisible?"open":""} />
            </span>
            <span>songs</span>
            <span className="Song-input"><input ref={songInputRef} onKeyPress={(event) => {
                if (event.key === "Enter" && songQuery) {
                    props.search(songQuery);
                }
            }} onChange={(event) => {setSongQuery(event.target.value)}} placeholder={"search song # or title"}></input></span>
            <TableOfContents songs={props.songs} setVisibility={setVisibility} isVisible={isVisible}/>
        </div>
    );
}