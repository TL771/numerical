let data;
let arr = []
const iterations =(n0,n1)=>{
    const column = n1-n0;
    if(arr[n0][column])return arr[n0][column];
    else if(n0 === n1){
        arr[n0][column] = data[n0].y 
    }else{
        arr[n0][column] = (iterations(n0+1,n1)-iterations(n0,n1-1))/(data[n1].x - data[n0].x);
    }
    return arr[n0][column]; 
}
export const newton=(dat)=>{
    data = dat
    const x = data.length;
    for(let i = x; i > 0;i--){
        let iu = []
        for(let j = 0; j < i;j++){
            iu.push(false);
        }
        arr.push(iu)
    }
    iterations(0,data.length-1);
    const L = [...arr[0]]
    arr = [];
    return {L}
}

export const findY=(x,arr)=>{
    const n = data.length-1;
    let d = 0;
    for(let i = 0;i <= n;i++){
        let value = arr[i];
        for(let j=0;j < i;j++){
            value *= ( x - data[j].x );
        }
        d += value;
    }
    return d
}
