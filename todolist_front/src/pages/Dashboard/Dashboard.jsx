import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Search from '../../components/Dashboard/Search/Search';
import DateTitle from '../../components/Dashboard/DateTitle/DateTitle';
import MenuList from '../../components/Dashboard/MenuList/MenuList';
import RegisterTodoButton from '../../components/RegisterTodoButton/RegisterTodoButton';

function Dashboard(props) {
    return (
        <div css={s.layout}>
            <header>
                <Search />
            </header>
            <main>
                <DateTitle />
                <MenuList />
            </main>
            <footer>
                <RegisterTodoButton/>
            </footer>
        </div>
    );
}

export default Dashboard;