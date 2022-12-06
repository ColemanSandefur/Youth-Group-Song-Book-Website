import * as React from "react"

export default function DarkModeSwitch() {

    const toggleColorMode = () => {
        let root = document.getElementsByTagName("html")[0]
        if (root.getAttribute("color") === "light") {
            root.setAttribute("color", "dark");
        } else {
            root.setAttribute("color", "light");
        }
    }

    return (
        <div className="dark-mode-switch"><button onClick={() => toggleColorMode()}>toggle color mode</button></div>
    )
}