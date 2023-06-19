import {useEffect, useState} from "react";
import React from "react";




const CounterA = React.memo(({count}) => {
    useEffect(() =>{
        console.log(`update count A : ${count}`);
    })
    return<div>{count}</div>
})
const CounterB = ({obj}) => {
    useEffect(() => {
        console.log(`update count ${obj.count}`)
        }
    )
    return<div>{obj.count}</div>
}

const areEqual = (preProps, nextProps) => { // 기본적으로 js 에선 얕은 비교를 (주소만 보고) 하므로 값을 비교하는 함수를 통해 값이 같을땐  리랜더링 방지
    if (preProps.obj.count === nextProps.obj.count){ // f리랜더링 해라
        return true;
    }
    return false // 말라
}


const MemorizedCounterB = React.memo(CounterB,areEqual);

const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count : 1
    })

    return <div style={{padding : 50}}>
        <div>
            <h2>
                CounterA
            </h2>
            <CounterA count={count}/>
            <button onClick={()=> setCount(count)}>A Button</button>
        </div>
        <div>
            <h2>Counter B</h2>
            <MemorizedCounterB obj={obj}/>
            <button onClick={() => setObj({count : obj.count})}>B Button</button>
        </div>

    </div>;
};

export default OptimizeTest;