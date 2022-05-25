import {subtract,multiply,add,nthRoot,dotMultiply} from 'mathjs';

const CGM=(A,B,X,R,D,i=0)=>{
    let y = -(multiply(D,R)/multiply(multiply(D,A),D))
    let Xnew = add(X,multiply(y,D))
    let Rnew =  subtract(multiply(A,Xnew),B)
    let Error = nthRoot(multiply(Rnew,Rnew),2)
    if(Error < 0.000001)return Xnew;
    let a = multiply(multiply(Rnew,A),D)/multiply(multiply(D,A),D)
    let Dnew = add(dotMultiply(-1,Rnew),dotMultiply(a,D))
    return CGM(A,B,Xnew,Rnew,Dnew,++i)
}
export const CGM_main=(A,B,X)=>{
    let R = subtract(multiply(A,X),B);
    let D = multiply(-1,R);
    try{
        return {X:CGM(A,B,X,R,D)};
    }catch(e){
        return {error:true,msg:"Invalid"}
    }
}