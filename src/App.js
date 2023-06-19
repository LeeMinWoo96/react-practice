import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useEffect, useMemo, useRef, useState} from "react";
import Lifecycle from "./Lifecycle";
import OptimizeTest from "./OptimizeTest";


// https://jsonplaceholder.typicode.com/comments

function App() {
    const [data, setData] = useState([]); // 일기 데이터

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
            setData(initData);
    }

    useEffect(() => {
        getData();
        },[]
    )

    const onCreate = (author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id : dataId.current
        }
        dataId.current += 1;
        setData([newItem, ...data]); // 앞에 신규 데이터 추가

    }

    const onRemove = (targetId) => {
        const newDiaryList = data.filter((it) => it.id !== targetId);
        setData(newDiaryList);
    }

    const onEdit = (targetId, newContent) =>{
        setData(
            data.map((it) =>
                it.id === targetId ? {...it, content: newContent} : it
            )
        )
    }

    const getDiaryAnalysis = useMemo(() => {
        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount/data.length) * 100;
        return [goodCount, badCount, goodRatio];
    }, [data.length]) // data.length 가 변화하지 않으면 이 함수는 따로 호출않고 결과를 바로 반환한다.

    const [goodCount, badCount, goodRatio] = getDiaryAnalysis;
  return (
    <div className="App">
        <OptimizeTest></OptimizeTest>
        <Lifecycle></Lifecycle>
        <DiaryEditor onCreate = {onCreate}/>
        <div>전체 일기 : {data.length}</div>
        <div>기분 좋은 일기 갯수 : {goodCount}</div>
        <div>기분 나쁜 일기 갯수 : {badCount}</div>
        <div>기좋 일기 비율 : {goodRatio}</div>
        <DiaryList onEdit = {onEdit} onRemove = {onRemove} diaryList = {data}/>
    </div>
  );
}

export default App;
