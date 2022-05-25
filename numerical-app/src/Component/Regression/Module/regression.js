import {sum,multiply,inv,round} from 'mathjs';

const sumY=(data)=>{
    return sum(data.map((value)=>value.y))
}

const sumXpowY=(i,pow,data)=>{
    return sum(data.map((value)=> Math.pow(value.x[i],pow)*value.y));
}

const sumXpow=(i,pow,data)=>{
    return sum(data.map((value)=> Math.pow(value.x[i],pow)));
}
const sumXX=(i,j,data)=>{
    return sum(data.map((value)=>value.x[i]*value.x[j]))
}
const sumXY=(i,data)=>{
    return sum(data.map((value)=> value.x[i]*value.y))
}

const makeFunction=(a,usefor)=>{
    const n = a.length;
    let f = ''
    if(usefor === "Regression"){
        for(let i = 0;i < n;i++){
            f += `${a[i]}*x^(${i})`
            if(i !== n-1){
                f += '+'
            }
        }
    }else if(usefor === "multiplyRegression"){
        for(let i = 0;i < n;i++){
            f += `${a[i]}`
            if(i !== 0){
                f +=  `*x${i-1}`
            }
            if(i !== n-1){
                f += '+'
            }
        }
    }
    return f;
}
export const regression=(data,order)=>{
    let A = [],B = [];
    const n = data.length;
    for(let i = 0;i <= order;i++){
        let arr = []
        for(let j = 0;j <= order;j++){
            arr.push(sumXpow(0,i+j,data));
        }
        A.push(arr);
    } 
    for(let i = 0;i <= order;i++){
        B.push(sumXpowY(0,i,data))
    }
    const iA = inv(A);
    const a = round(multiply(iA,B),7);
    const f = makeFunction(a,"Regression");
    return {a,f}
}

export const multiplyRegression=(data)=>{
    let A = [],B = [];
    const n = data.length;
    const m = data[0].x.length;
    let arr = []
    arr.push(n);
    for(let i = 0;i < m;i++){
        arr.push(sumXpow(i,1,data));
    }
    A.push(arr)

    for(let i = 0;i < m;i++){
        let arr = []
        arr.push((sumXpow(i,1,data)))
        for(let j = 0;j < m;j++){
            arr.push(sumXX(i,j,data))
        }
        A.push(arr)
    }
    /////////////////
    B.push(sumY(data))
    for(let i = 0;i < m;i++){
        B.push(sumXY(i,data));
    }
    
    const iA = inv(A);
    const a = round(multiply(iA,B),7);
    const f = makeFunction(a,"multiplyRegression");
    return {a,f}
}
// console.log((regression(data,1)));
// console.log((multiplyRegression(data1)));