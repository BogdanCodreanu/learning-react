import React, { useState } from "react";
import ValidationComponent from "./ValidationComponent";
import CharComponent from "./CharComponent";

const Assignment2 = () => {
    const [paragraphText, setParagraphText] = useState("Initial paragraph");

    function onChangeTextHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setParagraphText(e.target.value);
    }


    function onDeleteChar(char: string) {
        setParagraphText([...paragraphText].filter(c => c !== char).join(''));
    }

    console.log("recreating paragraph chars");
    const chars = [...new Set(paragraphText)].map((char, index) => {
        return <CharComponent onClick={onDeleteChar}
                              charRepresented={char}
                              key={char}/>;
    });

    return (
        <div>
            <input type={"text"} onChange={onChangeTextHandler} value={paragraphText}/>
            <ValidationComponent textLength={paragraphText.length}/>
            {chars}
        </div>
    );
};

export default Assignment2;