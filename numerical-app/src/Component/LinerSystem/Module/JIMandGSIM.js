const E = 0.000001;
const ans = [];
export const Iteration_Method=(X,Xn,ii)=>{
    let result = true;
    console.log(`i = ${ii}`);
    let ddd = []
    for(let i = 0;i < X.length;i++){
        const error = (Math.abs((Xn[i] - X[i])/Xn[i]))
        ddd.push({
            X : X[i],
            Xn : Xn[i],
            Error : error,
            Check : (error < E)
        })
        result &&= (error < E);
    }
    ans.push(ddd)
    return result;
}

export const JIM=(A,B,X,Xn,iteration = 1)=>{
    const n = A.length;
    for (let i = 0; i < n; i++) {
        Xn[i] = B[i];
        for(let j = 0; j < n; j++) {
            if(i !== j){
                Xn[i] -= A[i][j]*X[j];
            }
        }
        Xn[i] /= A[i][i];
    }
    if(iteration === 300)return {error:true , msg: "cant find answers." };
    if(Iteration_Method(X,Xn,iteration))return {X:[...Xn]};
    X = [...Xn];
    return JIM(A,B,X,Xn,++iteration);
}

export const GSIM=(A,B,X,Xn,iteration = 1)=>{
    const n = A.length;
    for (let i = 0; i < n; i++) {
        Xn[i] = B[i];
        for(let j = 0; j < n; j++) {
            if(i !== j){
                Xn[i] -= A[i][j]*((j < i )?Xn[j]:X[j]);
            }
        }
        Xn[i] /= A[i][i];
    }
    if(iteration === 300)return {error:true,msg: "cant find answers." };
    if(Iteration_Method(X,Xn,iteration))return {X:[...Xn]};
    X = [...Xn];
    return GSIM(A,B,X,Xn,++iteration);
}