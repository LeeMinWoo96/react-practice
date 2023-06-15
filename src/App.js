import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useRef, useState} from "react";
import Lifecycle from "./Lifecycle";


function App() {
    const [data, setData] = useState([]); // 일기 데이터

    const dataId = useRef(0);

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
        console.log(`${targetId} 가 삭제되었습니다.`);
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
  return (
    <div className="App">
        <Lifecycle></Lifecycle>
        <DiaryEditor onCreate = {onCreate}/>
        <DiaryList onEdit = {onEdit} onRemove = {onRemove} diaryList = {data}/>
    </div>
  );
}

export default App;
