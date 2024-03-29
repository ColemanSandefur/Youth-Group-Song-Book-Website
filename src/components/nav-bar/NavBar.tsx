import React, { useState } from "react";
import "../../styles/nav-bar.scss";
import TableOfContents from "./TableOfContents";

export default function NavBar(props:{
    search: (query: string) => void,
    songs: {title: string, lyrics: string[], reference?: React.RefObject<HTMLSpanElement>}[],
}) {
    let [isVisible, setVisibility] = useState(false);

    return (
        <div className="Nav-bar">
            <div className={"Expand-icon"} onClick={() => setVisibility(!isVisible)}>
                <div className={isVisible?"open":""} />
            </div>
            <span>Youth Group Songs</span>
            <TableOfContents songs={props.songs} setVisibility={setVisibility} isVisible={isVisible} />
        </div>
    );
}
