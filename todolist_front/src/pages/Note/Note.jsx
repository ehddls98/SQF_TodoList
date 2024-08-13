import React, { useState } from 'react';
import MainContainer from '../../components/MainContainer/MainContainer';

function Note(props) {
    const [note, setNote] = useState("");

    const handleInputChange = (e) => {
        setNote(e.target.value);
    }

    const handleSubmitClick = (e) => {
        if (note.trim() === "") {
            alert("메모를 입력하세요");
            return;
        }
        console.log("메모: " + note.trim());
        setNote("");
    }


    const handleKeyDown = (e) => {
        if (e.shiftKey) {
            return;
        }
        if (e.keyCode === 13) {
            handleSubmitClick();
        }
    }

    return (
        <MainContainer>
            <h1>메모</h1>
            <textarea name="note" value={note} onChange={handleInputChange} onKeyDown={handleKeyDown} autoFocus></textarea>
            <button onClick={handleSubmitClick}>확인</button>
        </MainContainer>
    );
}


export default Note;