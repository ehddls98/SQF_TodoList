import React, { useCallback, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function MainContainer({ children }) {

const [ scroll, setScroll ] = useState({
    startY: 0,
    isDown: false
});
const containerRef = useRef();

const handleDown = useCallback((e) => setScroll({
    startY: e.clientY,
    isDown: true,
}), []);


const handleUp = useCallback((e) => setScroll({
    startY: 0,
    isDown: false,
}), []);

const handleMove = (e) => {
    if (scroll.isDown) {
        const MAX_TOP = containerRef.current.scrollHeight - containerRef.current.offsetHeight;
        const MIN_TOP = 0;
        let moveY = e.clientY - scroll.startY;

        if(moveY < MIN_TOP) {
            moveY = MIN_TOP
        }

        console.log({s:containerRef.current});
        const scrollTop = containerRef.current.scrollTop;
        containerRef.current.scrollTop = scrollTop + (moveY * -1);
    }
}

    return (
        <div id={"#container"} css={s.container}
            onMouseMove={handleMove}
            onMouseDown={handleDown}
            onMouseUp={handleUp}
            ref={containerRef}>
            {children}
        </div>
    );
}

export default MainContainer;