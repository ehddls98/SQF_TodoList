import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import DashboardListItem from '../DashboardListItem/DashboardListItem';
import Icon from '../Icon/Icon';
import { BsCalendar4Week, BsCalendarEvent, BsCalendarCheck } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { todolistAtom } from '../../../atoms/todolistAtoms';

function Menu({ path, icon, color, title, count }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(path);
    }

    return(
        <div css={s.menuContainer} onClick={handleClick}>
            <div css={s.menuTop}>
                <Icon color={color}>{icon}</Icon>
                <p>{count}</p>
            </div>
            <h3 css={s.menuBottom}>
                {title}
            </h3>
        </div>
    )
}

function MenuList(props) {
    const [ todolist ] = useRecoilState(todolistAtom);

    return (
        <DashboardListItem title={"Menu"}>
            <div css={s.layout}>
                <Menu 
                    icon={<BsCalendarEvent />} 
                    color={"#009e2a"} 
                    title={"오늘"} 
                    count={todolist.counts.today} />
                <Menu
                    path={"/todo/all"} 
                    icon={<BsCalendar4Week />} 
                    color={"#444444"} 
                    title={"전체"} 
                    count={todolist.counts.all} />
                <Menu 
                    icon={<BsCalendar4Week />} 
                    color={"#ff2f2f"} 
                    title={"급한일"} 
                    count={todolist.counts.busy} />
                <Menu 
                    icon={<BsCalendar4Week />} 
                    color={"#64289c"} 
                    title={"중요한일"} 
                    count={todolist.counts.important} />
                <Menu 
                    icon={<BsCalendarCheck />} 
                    color={"#009de6"} 
                    title={"완료"} 
                    count={todolist.counts.complete} />
                
            </div>
        </DashboardListItem>
    );
}

export default MenuList;