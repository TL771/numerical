import {det,round} from 'mathjs';

export function Cramera(A,B){
    let X = [];
    const detA = round(det(A),6);
    if(detA !== 0){
        for(let i = 0;i < B.length;i++){
            let Ai = [];
            A.forEach((data,j)=>{
                Ai.push([...data]);
                Ai[j][i] = B[j];
            });
            X[i] = round(det(Ai),6)/detA;
        }
        return { X }
    }
    return {error: true , msg : "det A is zero."}
}