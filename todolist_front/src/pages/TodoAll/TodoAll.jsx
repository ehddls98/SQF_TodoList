import React, { useState } from 'react';
import PageAnimationLayout from '../../components/PageAnimationLayout/PageAnimationLayout';
import MainContainer from '../../components/MainContainer/MainContainer';
import BackButtonTop from '../../components/BackButtonTop/BackButtonTop';
import { getTodoAllApi } from '../../apis/todoApis/getTodoApi';

function TodoAll(props) {
    const [ isShow, setShow ] = useState(true);

    const requestTodolist = async () => {
        const todolist = await getTodoAllApi();
    }

    return (
        <PageAnimationLayout isShow={isShow} setShow={setShow}>
            <MainContainer>
               <BackButtonTop setShow={setShow} />
            </MainContainer>
        </PageAnimationLayout>
    );
}

export default TodoAll;