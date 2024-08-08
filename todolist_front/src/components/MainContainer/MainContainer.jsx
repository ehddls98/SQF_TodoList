import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import RegisterModal from '../RegisterModal/RegisterModal';

function MainContainer({ children }) {
const [ modalElement, setModalElement ] = useState(<></>);
const containerRef = useRef();

useEffect(() => {
    if(!!containerRef) {
        setModalElement(<RegisterModal containerRef={containerRef}/>);
    }
}, [containerRef]);

    return (
        <div css={s.container} ref={containerRef} >
            {modalElement}
            {children}
        </div>
    );
}

export default MainContainer;