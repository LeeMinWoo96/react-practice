import React, {useContext, useEffect, useRef, useState} from "react";
import {DiaryDispatchContext} from './App'

const DiaryItem = ({author, content, created_date, emotion, id}) =>{

    const {onEdit,onRemove} = useContext(DiaryDispatchContext)

    useEffect(() => {
        // console.log(`${id}번째 아이템 랜더`);
    });
    const handleRemove = () =>{
        if(window.confirm(`${id} 번째 일기를 정말 삭제하시겠습니까>`)){
            onRemove(id);
        }
    }

    const [isEdit, setIsEdit] = useState(false); // react 는 state 쟁이네

    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);

    const localContentInput = useRef();  // 컴포넌트에 focus 주려고

    const handleQuitEdit = () =>{
        setIsEdit(false);
        setLocalContent(content);
    }
    const handleEdit = () =>{
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`${id} 번째 일기를 정말 수정하시겠습니까>`)){
            onEdit(id, localContent);
        }
        toggleIsEdit();
    }

    return <div className="DiaryItem">
        <div className="info">
            <span>
                작성자 : {author} | 감정점수 : {emotion}
            </span>
            <br/>
            <span className="date">
                {new Date(created_date).toLocaleString()}
            </span>
            <div className="content">
                {isEdit ? (
                    <>
                        <textarea value={localContent} onChange={(e) => setLocalContent(e.target.value)} ref={localContentInput}/>
                    </>
                ) : (
                    <>{content}</>
                    )
                }
            </div>

            {isEdit ?
                <><button onClick={handleQuitEdit}>수정취소</button><button onClick={handleEdit}>수정완료</button></>
                :<><button onClick={() => {console.log(id); handleRemove();}}>삭제하기</button>
                <button onClick={toggleIsEdit}>수정하기</button></>
            }
        </div>
    </div>
}

export default React.memo(DiaryItem);