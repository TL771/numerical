import {subtract,multiply,dotDivide} from 'mathjs';

export function GuessEliminateMethod(A,B){
    const n = B.length;
    let X = [];
    for(let i = 0;i < n;i++){
        for(let j = i+1;j < n;j++){
            let a = A[i][i],b = A[j][i];
            A[j] = subtract(multiply([...A[i]],b),multiply([...A[j]],a));
            B[j] = subtract(B[i]*b , B[j]*a);
        }
    }
    for(let i = n-1;i >= 0;i--){
        let ax = B[i];
        for(let j = i+1 ;j < n;j++){
            ax -= A[i][j]*X[j]; 
        }
        X[i] = ax/A[i][i];
    }
    return {A,B,X};
}

export function GaussJordanMethod(A,B){
    const n = B.length;
    let X = [];
    const answer = GuessEliminateMethod(A,B);
    let At = answer.A,Bt = answer.B;
    for(let i = n-1;i >= 0;i--){
        for(let j = i-1;j >=0;j--){
            const a = At[i][i],b = At[j][i];
            A[j] = subtract(multiply([...A[i]],b),multiply([...A[j]],a));
            B[j] = subtract(B[i]*b , B[j]*a);
        }
    }
    for(let i = 0;i < n;i++){
        const c = A[i][i];
        At[i] = dotDivide(At[i],c);
        Bt[i] = dotDivide(Bt[i],c);
    }
    return {X:Bt};
}