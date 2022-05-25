import { evaluate,abs } from "mathjs";
const E = 0.000001;
const v = 1;
let answer = [];
let f = (equation,x)=>{
    return  evaluate(equation,{x});
}
export default function secant(equation,x0,i=0){
    const x1 = x0-v;
    const diff0 = f(equation,x0);
    const diff1 = (f(equation,x0)-f(equation,x1))/(x0-x1);
    const xn = x0 - (diff0/diff1);
    const check = abs((xn-x0)/xn);
    answer.push({i,x:x0,xn,error:check});
    if(check < E){
        const ans = answer;
        answer = [];
        return {xn,answer:ans};
    }else if(i === 500){
        answer = [];
        return undefined;
    }
    return secant(equation,xn,++i);
}