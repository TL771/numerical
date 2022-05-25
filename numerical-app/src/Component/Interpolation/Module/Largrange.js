let Ls = []
const f = ''
const largrangeInterpolation=(test,x,n,level)=>{
    if(n < 0)return 0;
    let up = 1,down = 1;
    for(let i = 0;i < level;i++){
        if(i !== n){
            up   *= ( test[i].x - x );
            down *= ( test[i].x - test[n].x );
        }
    }
    const L = up/down;
    Ls.push(L)
    const fx = test[n].y;
    return L*fx + largrangeInterpolation(test,x,--n,level);
}


export const largrange=(data,x)=>{
    const n = data.length;
    const ans = (largrangeInterpolation(data,x,n-1,n));
    const L = Ls;
    Ls = [];
    return { y : ans , L};
}

