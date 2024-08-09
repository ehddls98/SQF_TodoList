import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { IoCellularSharp } from "react-icons/io5";
import { IoIosWifi } from "react-icons/io";
import { IoIosBatteryFull } from "react-icons/io";

function MainLayout({ children }) {
    const [clock, setClock] = useState("0:00");

    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = (Math.floor(now.getMinutes() / 10) === 0 ? "0" : "") + now.getMinutes();
            // (now.getMinutes() < 10 ? "0" : "") + now.getMinutes(); 정각부터 9분까지는 분 앞자리에 0
            setClock(`${hours}:${minutes}`);
        }, 1000);
    }, []);

    return (
        <div css={s.layout} >
            <div css={s.frame}>
                <div css={s.topBar}>
                    <div css={s.clock}>{clock}</div>
                    <div css={s.topBarCenter}></div>
                    <div css={s.rightItems}><IoCellularSharp /><IoIosWifi /><IoIosBatteryFull /></div>
                </div>
                    {children}
            </div>
        </div>
    );
}

export default MainLayout;