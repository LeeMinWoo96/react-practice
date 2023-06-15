
import React,{useEffect, useState} from "react";


// 왜 마운트할때 마운트,언마운트,마운트 이렇게 반복하지
const UnMountTest = () =>{
    useEffect(() =>{
        console.log("Mount");
        // return () => {
        //     console.log("unmount");
        // };
    },[]);

    return <div>UnMountTest</div>
};

const Lifecycle = () => {
    // const [count, setCount] = useState(0);
    // const [text, setText] = useState("");
    //
    // useEffect(() =>{ // 마운트 시점에 수행 // 그 이외 랜더링 시점엔 x (dependency arr 에 [] 넣었으므로 마운트시덤에만)
    //     console.log("mount");
    // },[]);
    //
    // useEffect(() =>{ // 랜더링 시점에 실행 -> dependency array 매개변수를 안넘겼으므로 어떤 컴포넌트가 변경되어도 수행
    //     console.log("update");
    // });
    //
    // useEffect(() => { // 카운트 컴포넌트 바뀔때
    //     console.log("count is ");
    // },[count])


    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);


    return (
        <div style={{padding : 20}}>
        {/*<div>*/}
        {/*    {count}*/}
        {/*    <button onClick={() => setCount(count+1)}>+</button>*/}

        {/*</div>*/}
        {/*<input value={text} onChange={(e) => setText(e.target.value)}></input>*/}

        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnMountTest />}
    {/*    true 일때만 보이기 */}
    </div>);
};

export default Lifecycle;