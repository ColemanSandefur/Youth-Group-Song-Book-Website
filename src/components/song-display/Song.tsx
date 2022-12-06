import * as React from "react"

var Song = React.forwardRef((props: {title: string, lyrics: string[], id?: number}, ref) => {
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
        <div className="song" ref={ref}>
            <h1><span>{prefix}</span>{props.title}</h1>
            <span>{output}</span>
        </div>
    );
});

export default Song;
