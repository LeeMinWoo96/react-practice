import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import Lifecycle from "./Lifecycle";
import OptimizeTest from "./OptimizeTest";


// https://jsonplaceholder.typicode.com/comments

const reducer = (state, action) => {
    switch (action.type){
        case 'INIT':{
            return action.data
        }
        case 'CREATE':{
            const created_date = new Date().getTime();
            const newItem = {
                ...action.data,
                created_date
            }
            return [newItem,...state]
        }

        case 'REMOVE':{
            return state.filter((it) => it.id !== action.data);
        }
        case 'EDIT':
            console.log(action.data.targetId);
            console.log(action.data.newContent);
            return state.map((it) => it.id === action.data.targetId ? {...it,content: action.data.newContent} : it );
        default:
            return state;
    }
}

// component drilling 문제 해결위해
// context 공유 위해 export
export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();




function App() {
    // const [data, setData] = useState([]); // 일기 데이터

    const [data, dispatch] = useReducer(reducer, []);
    const dataId = useRef(0);

    const getData = async () =>{ // ㅂㅣ동기
            const res = await fetch("https://jsonplaceholder.typicode.com/comments").then((res) => res.json());

            const initData = res.slice(0,20).map((it => {
                return {
                    author: it.email,
                    content: it.body,
                    emotion: Math.floor(Math.random()*5)+1,
                    created_date: new Date().getTime(),
                    id : dataId.current++
                }
            }));
            dispatch({type:"INIT", data:initData});
    }

    useEffect(() => {
        getData();
        },[]
    )

    const onCreate = useCallback((author, content, emotion) => {

        dispatch({type:'CREATE', data:{author,
                content,
                emotion,
                id : dataId.current}})

        // const created_date = new Date().getTime();
        // const newItem = {
        //     author,
        //     content,
        //     emotion,
        //     created_date,
        //     id : dataId.current
        // }
        dataId.current += 1;
        // setData((data) => [newItem, ...data]); // 앞에 신규 데이터 추가
    //    함수형 업데이트 , 게시물을 삭제할땐 랜더링 되지 않도록 최적화
    //    보통 prop 이 업데이트 되거나, 상태값이 업데이트가 되거나,
    //    부모 component 가 업데이트 되면 랜더링되는데
    //    내 prop 이 업데이트 될때만 랜더링 되도록 최적화 하는거임

    },[]);

    // 최적화 ~~~ 삭제해도 다른것들 랜더링 xx
    const onRemove = useCallback((targetId) => {
        dispatch({type:'REMOVE', data:targetId});
        // setData((data) => data.filter((it) => it.id !== targetId));
    },[]);

    const onEdit = useCallback((targetId, newContent) =>{
        dispatch({type:"EDIT",data:{targetId : targetId, newContent : newContent}})
        // setData((data) =>
        //     data.map((it) =>
        //         it.id === targetId ? {...it, content: newContent} : it
        //     )
        // )
    },[]);

    // 같은 depth의 context 에 값을 한번에 전달하기 위해서
    // 묶는데 그냥 객체로 묶으면 app component 가 재생성 될때
    // 다시 리랜더 됨으로 useMemo 를 통해서 그를 막아줌
    const memoizedDispathes = useMemo(() =>{
        return {onCreate, onEdit, onRemove}
    })

    const getDiaryAnalysis = useMemo(() => {
        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount/data.length) * 100;
        return [goodCount, badCount, goodRatio];
    }, [data.length]) // data.length 가 변화하지 않으면 이 함수는 따로 호출않고 결과를 바로 반환한다.

    const [goodCount, badCount, goodRatio] = getDiaryAnalysis;


  return (
      // 데이터를 하나하나 내리는게 아니라 전역적으로 공유하는 기능인듯
      // 그니까 props 로 내리는게 아니라 context 를 통해서
      // 공유하는거임 그럼 하나하나 자식으로 안내려도 된다 이거야!
      // 주의할점은 Provider 도 결국 component 이기 때문에
      // 값이 바뀌면 rerendering 됨 그래서
      // 한번에 여러 값을 내려주면 하나만 바뀌어도 쫙 재로딩하는 참사가 나올 수 있음
      //
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value = {memoizedDispathes}>
                <div className="App">
                    {/*<OptimizeTest></OptimizeTest>*/}
                    {/*<Lifecycle></Lifecycle>*/}
                    <DiaryEditor />
                    <div>전체 일기 : {data.length}</div>
                    <div>기분 좋은 일기 갯수 : {goodCount}</div>
                    <div>기분 나쁜 일기 갯수 : {badCount}</div>
                    <div>기좋 일기 비율 : {goodRatio}</div>
                    <DiaryList />
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
  );
}

export default App;
