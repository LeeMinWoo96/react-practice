import DiaryItem from "./DiaryItem";
import {useContext} from 'react';
import {DiaryStateContext, DiaryDispatchContext} from './App'
// diarylist 를 왜 두번 ?
const DiaryList = () =>{
    const diaryList = useContext(DiaryStateContext);

    return (
        <div></div>,
        <div className="DiaryList">
            {diaryList.map((it) => (
                <DiaryItem key = {it.id} {...it}/>
                // <div key={it.id}>
                //     <div>작성자 : {it.author}</div>
                //     <div>일기 : {it.content}</div>
                //     <div>감정점수 : {it.emotion}</div>
                //     <div>날짜 : {it.created_date}</div>
                // </div>
            ))}
        </div>
    )
}

DiaryList.defaultPros= {
    diaryList : [],
}
export default DiaryList;