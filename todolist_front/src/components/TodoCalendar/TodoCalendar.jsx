/** @jsxImportSource @emotion/react */
import { useRecoilState, useSetRecoilState } from "recoil";
import { changeCheckTodoStatus } from "../../apis/todoApis/modifyTodoApi";
import * as s from "./style";
import { refreshTdolistAtom, refreshTodolistAtom } from "../../atoms/todolistAtoms";
import { modifyTodoAtom, selectedCalendarTodoAtom } from "../../atoms/calendarAtom";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

function TodoBox({ todo }) {
    const importantOptions = [
        { label: "🟣 " + "중요함", value: 1, },
        { label: "⚪ " + "중요하지않음", value: 2, },
    ];

    const busyOptions = [
        { label: "🔴 " + "급함", value: 1, },
        { label: "⚪ " + "급하지않음", value: 2, },
    ];

    const [selectedTodo, setSelectedTodo] = useRecoilState(selectedCalendarTodoAtom);
    const setRefresh = useSetRecoilState(refreshTodolistAtom);
    const [modifyTodo, setModifyTodo] = useRecoilState(modifyTodoAtom);

    //수정 중에 다른 todo를 클릭하면 원래 todo 내용으로 복구
    useEffect(() => {
        //todo를 선택하면 그 todo의 id가 selectedTodo에 대입된다. 그 id와 todo의 id와 일치할때 
        if(selectedTodo === todo.todoId) {
            setModifyTodo({ 
                ...todo,
                todoDateTime: todo.todoDateTime.replaceAll(" ", "T"),
             });
        }
    }, [selectedTodo])

    const handleCheckBoxOnChange = async (e) => {
        await changeCheckTodoStatus(e.target.value);
        setRefresh(true);
    }

    const handleSelectTodoClick = (todoId) => {
        setSelectedTodo(todoId);
    }

    const handleModifyChange = (e) => {
        setModifyTodo(modifyTodo => ({
            ...modifyTodo,
            [e.target.name]: e.target.value
        }));
    }

    const handleImportantSelectOnChange = (option) => {
        setModifyTodo(modifyTodo => ({
            ...modifyTodo,
            important: option.value
        }))
    }

    const handleBusySelectOnChange = (option) => {
        setModifyTodo(modifyTodo => ({
            ...modifyTodo,
            busy: option.value
        }))
    }

    return <div css={s.todoBox}>
        <div css={s.todoTitleBox}>
            <div css={s.todoCheckBox}>
                <input type="checkbox"
                    id={todo.todoId}
                    checked={todo.status === 2}
                    onChange={handleCheckBoxOnChange}
                    value={todo.todoId} />
                <label htmlFor={todo.todoId}></label>
            </div>
            <div css={s.todoTitleAndTime}>
                {
                    selectedTodo === todo.todoId
                        ? <input type="text" name="title" onChange={handleModifyChange} value={modifyTodo.title} />
                        : <h2 onClick={() => handleSelectTodoClick(todo.todoId)}>{todo.title}</h2>
                }
                <span>{todo.todoDateTime.slice(11)}</span>
            </div>
        </div>
        <div css={s.todoSubBox}>
            {
                selectedTodo === todo.todoId &&
                <>
                    <div css={s.contentBox}>
                        <h3>메모</h3>
                        <textarea name="content" onChange={handleModifyChange} value={modifyTodo.content}></textarea>
                    </div>
                    <div>
                        <ReactSelect
                            onChange={handleImportantSelectOnChange}
                            styles={{
                                control: (style) => ({
                                    ...style,
                                    marginBottom: "5px",
                                    border: "none",
                                    outline: "none",
                                    boxShadow: "none",
                                    backgroundColor: "#f5f5f5",
                                    cursor: "pointer",
                                }),
                                menu: (style) => ({
                                    ...style,
                                    backgroundColor: "#f5f5f5",
                                }),
                                option: (style) => ({
                                    ...style,
                                    cursor: "pointer",
                                }),
                            }}
                            options={importantOptions}
                            value={importantOptions.filter(option => option.value === modifyTodo.important)[0]}
                        />
                        <ReactSelect
                            onChange={handleBusySelectOnChange}
                            styles={{
                                control: (style) => ({
                                    ...style,
                                    border: "none",
                                    outline: "none",
                                    boxShadow: "none",
                                    backgroundColor: "#f5f5f5",
                                    cursor: "pointer",
                                }),
                                menu: (style) => ({
                                    ...style,
                                    backgroundColor: "#f5f5f5",
                                }),
                                option: (style) => ({
                                    ...style,
                                    cursor: "pointer",
                                }),
                            }}
                            options={busyOptions}
                            value={busyOptions.filter(option => option.value === modifyTodo.busy)[0]}
                        />
                    </div>
                </>
            }

        </div>
    </div>
}

function TodoDateGroup({ date, todos }) {
    return <>
        <h2 css={s.dateTitle}>{date}</h2>
        <div>
            {
                todos.map(todo => <TodoBox key={todo.todoId} todo={todo} />)
            }
        </div>
    </>
}

function TodoMonthGroup({ month, dateOfCalendarData }) {
    const entriesOfDate = Object.entries(dateOfCalendarData);

    return <>
        <h2 css={s.monthTitle}>{month}월</h2>
        <div>
            {
                entriesOfDate.map(([date, todos]) =>
                    <TodoDateGroup key={date} date={date} todos={todos} />)
            }
        </div>
    </>
}

function TodoYearGroup({ year, monthOfCalendarData }) {
    const entriesOfMonth = Object.entries(monthOfCalendarData);

    return <>
        <h2 css={s.yearTitle}>{year}년</h2>
        <div>
            {
                entriesOfMonth.map(([month, dateOfCalendarData]) =>
                    <TodoMonthGroup key={year + month} month={month} dateOfCalendarData={dateOfCalendarData} />)
                // key에 month + year를 해준 이유는 month는 매년 반복되기 때문에 year를 더해서 고유성을 부여하였다.
            }
        </div>
    </>
}

function TodoCalendar({ calendarData }) {
    const [selectedTodo, setSelectedTodo] = useRecoilState(selectedCalendarTodoAtom);
    const entriesOfCalendarData = Object.entries(calendarData);

    useEffect(() => {
        setSelectedTodo(0);
    }, [])

    return (
        <div css={s.layout}>
            {
                entriesOfCalendarData.map(([year, monthOfCalendarData]) =>
                    <TodoYearGroup key={year} year={year} monthOfCalendarData={monthOfCalendarData} />)
            }
        </div>
    );
}

export default TodoCalendar;