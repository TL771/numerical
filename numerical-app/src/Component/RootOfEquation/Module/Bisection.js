import {evaluate} from 'mathjs'


let E = 0.000001
let i = [];
let f = (equation,x)=>{
    return  evaluate(equation,{x});
}
export default function bisection(equation,xl,xr,iteration=1){
    const fxl = f(equation,xl),fxr = f(equation,xr);
    if(Math.sign(fxl)*Math.sign(fxr) > 0)return -1;
    const xm = (xl+xr)/2;
    const fxm = f(equation,xm);
    console.log(`iteration ${iteration}`)
    console.log(`xl = ${xl}\nxr = ${xr}\nxm = ${xm}`)
    console.log(`f(xm) = ${f(xm)}`)
    console.log(`----------------------------------`)
    const checkLR = Math.sign(fxl)*Math.sign(fxm) < 0;
    i.push({
        i:iteration,
        xl,
        xr,
        xm,
        fxl,
        fxr,
        fxm,
        error:Math.abs((xm-((checkLR)?xr:xl))/xm)
    })
    if(Math.abs((xm-((checkLR)?xr:xl))/xm) < E){
        let r = i;i = [];
        return {x:xm,i:r};
    }
    return (checkLR)?bisection(equation,xl,xm,++iteration):bisection(equation,xm,xr,++iteration);
}