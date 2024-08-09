import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Search from '../../components/Dashboard/Search/Search';
import DateTitle from '../../components/Dashboard/DateTitle/DateTitle';
import MenuList from '../../components/Dashboard/MenuList/MenuList';
import RegisterTodoButton from '../../components/RegisterTodoButton/RegisterTodoButton';
import MainContainer from '../../components/MainContainer/MainContainer';
import { Route, Routes } from 'react-router-dom';
import TodoAll from '../TodoAll/TodoAll';
import { useRecoilState } from 'recoil';
import { refreshTdolistAtom, todolistAtom } from '../../atoms/todolistAtoms';
import { getTodoAllApi, getTodoCountsApi } from '../../apis/todoApis/getTodoApi';

function Dashboard(props) {
    const [ todolist, setTodolist ] = useRecoilState(todolistAtom);
    
    const [ refresh ,setRefresh ] = useRecoilState(refreshTdolistAtom);

    const requestTodolist = async () => {
        const todolist = await getTodoAllApi();
        const counts = await getTodoCountsApi();
        setTodolist({
            todolist: todolist?.data, //?(null safe) = null인지 확인하고 null이면 참조하지 않음.
            counts: counts?.data
        });
    }

    useEffect(() => {
        if(refresh) {
            requestTodolist();
        }
        setRefresh(false);
    }, [refresh])

    return (
        <MainContainer>
            <div css={s.layout}>
                <header>
                    <Search />
                </header>
                <main>
                    <DateTitle />
                    <MenuList />
                </main>
                <footer>
                    <RegisterTodoButton />
                </footer>
            </div>
        <Routes>
            <Route path="/all" element={<TodoAll todolist={todolist}/>} />
        </Routes>
        </MainContainer>
    );
}

export default Dashboard;