import DiaryItem from "./DiaryItem";

// diarylist 를 왜 두번 ?
const DiaryList = ( {onEdit, onRemove, diaryList} ) =>{
    return (
        <div></div>,
        <div className="DiaryList">
            {diaryList.map((it) => (
                <DiaryItem key = {it.id} {...it} onRemove = {onRemove} onEdit = {onEdit}/>
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