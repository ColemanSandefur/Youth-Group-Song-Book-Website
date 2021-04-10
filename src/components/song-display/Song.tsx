export default function Song(props: {title: string, lyrics: string[], id?: number, ref?: React.RefObject<HTMLDivElement>}) {
    //format each element of the array into a JSX Element
    let output = props.lyrics.map((value, index) => {
        //an empty <p> is not normally displayed so we should make it a <br> instead
        if (value.trim().length === 0) {
            return <br key={index}/>
        }
        return (<p key={index}>{value}</p>);
    });

    //format id if it exists
    let prefix=props.id ? props.id + ": " : "";

    return (
        <div className="song" ref={props.ref}>
            <h1>{prefix}{props.title}</h1>
            <span>{output}</span>
        </div>
    );
}