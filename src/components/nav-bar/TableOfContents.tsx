import {scrollTo} from "../song-display/SongDisplay";

export default function TableOfContents(props: {
    songs: {title: string, reference?: React.RefObject<HTMLSpanElement>}[],
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible: boolean
}) {
    let formatted = props.songs.map((song, index) => {
        return (
            <p onClick={() => {
                // alert(song.title);
                scrollTo(song.reference);
                props.setVisibility(false);
            }}>{index + 1 + ": " + song.title}</p>
        )
    });

    return (
        <div className="Table-of-contents" style={{
            visibility: props.isVisible?"visible":"collapse"
        }} onClick={() => props.setVisibility(false)}>
            <div>
                {formatted}
            </div>
            
        </div>
    )
}