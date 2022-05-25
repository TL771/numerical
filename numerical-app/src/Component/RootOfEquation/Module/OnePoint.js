import {evaluate} from 'mathjs';


let E = 0.000001
let answer = [];
let f = (equation,x)=>{
    return  evaluate(equation,{x});
}

export default function onepoint(equation,x,i=0){
    // console.log(`iteration = ${i}`)
    const xn = f(equation,x);
    const check = Math.abs((xn-x)/xn);
    // console.log(`x = ${x}\nxn = ${xn}\ncheck = ${check}`);
    // console.log(`---------------------`);
    answer.push({i,x,xn,error:check});
    if(check < E){
        const ans = answer;
        answer = [];
        return {xn,answer:ans};
    }
    else if(i === 500){
        answer = [];
        return undefined;
    }
    return onepoint(equation,xn,++i);
}


