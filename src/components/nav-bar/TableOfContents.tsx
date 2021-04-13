import {scrollTo} from "../song-display/SongDisplay";

export default function TableOfContents(props: {
    songs: {title: string, reference?: React.RefObject<HTMLSpanElement>}[],
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible: boolean
}) {
    let formatted = props.songs.map((song, index) => {
        return ({
            name: song.title,
            dom: <p onClick={() => {
                // alert(song.title);
                scrollTo(song.reference);
                props.setVisibility(false);
            }} key={index}><span>{index + 1 + ":\t"}</span> {song.title}</p>
        });
    });

    formatted.sort((a, b) => (a.name > b.name)? 1 : -1);

    let output = formatted.map((song) =>{
        return song.dom;
    });

    return (
        <div className="Table-of-contents custom-scrollbar" style={{
            visibility: props.isVisible?"visible":"collapse"
        }} onClick={() => props.setVisibility(false)}>
            <div>
                {output}
            </div>
            
        </div>
    )
}