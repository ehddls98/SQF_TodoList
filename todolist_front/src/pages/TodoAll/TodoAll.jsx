import React, { useEffect, useState } from 'react';
import PageAnimationLayout from '../../components/PageAnimationLayout/PageAnimationLayout';
import MainContainer from '../../components/MainContainer/MainContainer';
import BackButtonTop from '../../components/BackButtonTop/BackButtonTop';
import PageTitle from '../../components/PageTitle/PageTitle';
import { MENUS } from '../../constants/menus';
import { useRecoilState } from 'recoil';
import { todolistAtom } from '../../atoms/todolistAtoms';
import YearGroup from '../../components/YearGroup/YearGroup';

function TodoAll(props) {
    const [ isShow, setShow ] = useState(true);
    const [ todolistAll ] = useRecoilState(todolistAtom);
    const [ calendar, setCalendar ] = useState([]);
    
    useEffect(()=> {
        
        //객체를 배열로 만들어야 순서대로 출력할 수 있다.
        const obj = {
            "test1": 10,
            "test2": 20,
            "test3": 30,
            "test4": 40,
        }

        //obj 객체를 Object.entries를 통해 objList로 변환
        const objList = Object.entries(obj);
        console.log(Object.entries(obj))
        
        //objList 안에 들어있는 하나의 엔트리는 [key: value]로 구성되어 있다. 
        for(let o of objList) {
            const key = o[0]; // test1, test2, test3, test4
            const value = o[1]; //10, 20, 30, 40
            
            console.log("key: " + key);
            console.log("value: " + value);
        }

        //객체 안에 객체가 있는 형태
        //obj2 안에 있는 a, b 객체도 entry로 변환하여 순서대로 출력할 수 있다.
        const obj2 = {
            "a": {
                "test1": 10,
                "test2": 20,
                "test3": 30,
                "test4": 40,
            },
            "b": {
                "test5": 50,
                "test6": 60,
                "test7": 70,
                "test8": 80,
            },
            
        }
        // const objList = Object.entries(obj2);
        // for(let o of objList) {
        //     const key = o[0];
        //     const value = Object.entries(o[1]);
            
        //     console.log("key: " + key);
        //     console.log("value: " + value);

        //     for(let e of value) {
        //         const key2 = e[0];
        //         const value2 = e[1];
        //         console.log("key2:" + key2)
        //         console.log("value2:" + value2)
        //     }
        // }
    }, []);

        useEffect(() => {
        let calendarData = {}; //calendarData 빈 객체를 선언한다. 
        for (let todo of todolistAll.todolist) { //todolistAll에서 
            const year = todo.todoDateTime.slice(0, 4);
            const month = todo.todoDateTime.slice(5, 7);

            if (!calendarData[year]) {
                calendarData[year] = {};
            }
            if (!calendarData[year][month]) {
                calendarData[year][month] = [];
            }

            calendarData[year][month].push(todo);
        }
                
        setCalendar(<YearGroup calendarData={calendarData} />);

    }, [todolistAll]);

    return (
        <PageAnimationLayout isShow={isShow} setShow={setShow}>
            <MainContainer>
               <BackButtonTop setShow={setShow} />
               <PageTitle title={MENUS.all.title} color={MENUS.all.color} />
               {calendar}

            </MainContainer>
        </PageAnimationLayout>
    );
}

export default TodoAll;