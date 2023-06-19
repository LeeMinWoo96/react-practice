import {useRef, useState} from "react";
import "./App.css";
const DiaryEditor = ({onCreate}) => {
    // const [author, setAuthor] = useState("");
    // const [content, setContent] = useState("");

    const [state, setState] = useState({
        author : "",
        content : "",
        emotion : 1
    });

    const handleChangerState = (e) =>{
         console.log(e.target.value);

         setState({
             ...state,
             [e.target.name] : e.target.value
         })
    }

    const authorInput = useRef();

    const handleSubmit = () => {
        if (state.author.length < 1){
            authorInput.current.focus();
            return
        }
        if (state.content.length < 1){
            alert("본문 길이 1자 이상으로 압력해주세요");
            return
        }
        onCreate(state.author, state.content, state.emotion);
        setState({
            author: "",
            content: "",
            emotion: 1
        });
        alert("저장 성공");
    }
    return (
        <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
            <div>
                <input name="author" ref={authorInput} value={state.author} onChange = {(handleChangerState)} />
            </div>
            <div>
                <textarea name="content" value={state.content} onChange={(e) =>{
                    setState({
                        ...state,
                        content: e.target.value
                    })
                    // console.log(e.target.value)

                }}/>
            </div>
            <div>
                <select name = "emotion" value={state.emotion} onChange={handleChangerState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>

            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
    </div>
    );
};

export default DiaryEditor;