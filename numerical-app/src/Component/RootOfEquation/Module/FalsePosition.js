import {evaluate} from 'mathjs'


let E = 0.000001
let i = [];
let f = (equation,x)=>{
    return  evaluate(equation,{x});
}
export default function falseposition(equation,xl,xr,iteration=1){
    const fxl = f(equation,xl),fxr = f(equation,xr);
    if(Math.sign(fxl)*Math.sign(fxr) > 0)return -1;
    const x1 = ((xl*fxr)-(xr*fxl))/(fxr-fxl);
    const fx1 = f(equation,x1);
    console.log(`iteration ${iteration}`)
    console.log(`xl = ${xl}\nxr = ${xr}\nxm = ${x1}`)
    console.log(`f(xm) = ${f(x1)}`)
    console.log(`----------------------------------`)
    const checkLR = Math.sign(fxl)*Math.sign(fx1) < 0;
    i.push({
        i:iteration,
        xl,
        xr,
        xm:x1,
        fxl,
        fxr,
        fxm:fx1,
        error:Math.abs((x1-((checkLR)?xr:xl))/x1)
    })
    if(Math.abs((x1-((checkLR)?xr:xl))/x1) < E){
        let r = i;i = [];
        return {x:x1,i:r};
    }
    return (checkLR)?falseposition(equation,xl,x1,++iteration):falseposition(equation,x1,xr,++iteration);
}