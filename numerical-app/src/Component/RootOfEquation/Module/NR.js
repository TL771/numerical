import {evaluate} from 'mathjs'
const E = 0.000001;

let f = (equation,x)=>{
    return  evaluate(equation,{x});
}

let answer = [];

export default function  NR(equation,dequation,x,i=0){
    const diff = f(equation,x);
    const diff2 = f(dequation,x);
    const xn = x-(diff/diff2);
    const cc = Math.abs((xn-x)/xn);
    answer.push({i,x,xn,error:cc});
    console.log(`${i} xn = ${xn}\ncheck = ${cc}`)
    console.log(`-------------------------`)
    if(cc < E){
        const a =  answer;
        answer = [];
        return {xn,answer:a};
    }
    return NR(equation,dequation,xn,++i); 
}
